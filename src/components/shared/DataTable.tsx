import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './DataTable.module.css';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SlidersIcon, GripIcon } from '../Icons/icons';
import EmptyState from './EmptyState';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ColumnDef<TRow> {
  key: string;
  header: string;
  /** Optional tooltip shown as a ? icon next to the header label */
  headerTooltip?: string;
  defaultWidth?: number;
  minWidth?: number;
  /** Whether clicking the header sorts. Default: true when sortValue is set or onSortChange is provided. */
  sortable?: boolean;
  /** Whether the column appears in the column configurator. Default: true */
  hideable?: boolean;
  /** Initial visibility. Default: true */
  defaultVisible?: boolean;
  /** Initial text alignment. Default: 'left' */
  defaultAlign?: 'left' | 'center' | 'right';
  cell: (row: TRow) => React.ReactNode;
  /** CSS class applied to each <td> in this column. Can be a static string or a function of the row. */
  cellClassName?: string | ((row: TRow) => string);
  /** CSS class applied to the <th> header cell. */
  headerClassName?: string;
  /** Provide to enable DataTable-managed (uncontrolled) sort for this column. */
  sortValue?: (row: TRow) => string | number | Date;
}

export interface DataTableProps<TRow> {
  columns: ColumnDef<TRow>[];
  /** Pre-filtered rows. If using controlled sort, pass pre-sorted rows too. */
  rows: TRow[];
  rowKey: (row: TRow) => string;
  onRowClick?: (row: TRow) => void;
  rowClassName?: (row: TRow) => string;
  /** --- Controlled sort --- pass all three together to have parent own sort state */
  sortCol?: string;
  sortDir?: 'asc' | 'desc';
  onSortChange?: (col: string, dir: 'asc' | 'desc') => void;
  /** Default page size. Default: 20 */
  defaultPageSize?: number;
  /** Available page size options. Pass empty array to disable pagination. Default: [10, 20, 50, 100] */
  pageSizeOptions?: number[];
  /** localStorage key for persisting column visibility. */
  storageKey?: string;
  /** Initial sort column key (uncontrolled sort only). */
  defaultSortCol?: string;
  /** Initial sort direction (uncontrolled sort only). Default: 'asc' */
  defaultSortDir?: 'asc' | 'desc';
  /** Rows matching this predicate are always pinned to the bottom, regardless of sort direction. */
  rowPinBottom?: (row: TRow) => boolean;
  /** Use 'auto' table layout so columns size to content instead of fixed widths. Default: 'fixed' */
  tableLayout?: 'fixed' | 'auto';
  emptyState?: React.ReactNode;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

function DataTable<TRow>({
  columns,
  rows,
  rowKey,
  onRowClick,
  rowClassName,
  sortCol: controlledSortCol,
  sortDir: controlledSortDir,
  onSortChange,
  defaultPageSize = 20,
  pageSizeOptions = [10, 20, 50, 100],
  storageKey,
  defaultSortCol,
  defaultSortDir,
  tableLayout = 'fixed',
  rowPinBottom,
  emptyState,
  className,
}: DataTableProps<TRow>) {
  const isControlledSort = onSortChange !== undefined;

  // ── Internal sort state (used when uncontrolled) ─────────────────────────
  const [internalSortCol, setInternalSortCol] = useState<string | null>(defaultSortCol ?? null);
  const [internalSortDir, setInternalSortDir] = useState<'asc' | 'desc'>(defaultSortDir ?? 'asc');

  const activeSortCol = isControlledSort ? (controlledSortCol ?? null) : internalSortCol;
  const activeSortDir = isControlledSort ? (controlledSortDir ?? 'asc') : internalSortDir;

  // ── Column widths ────────────────────────────────────────────────────────
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map(c => [c.key, c.defaultWidth ?? 150]))
  );

  // ── Column visibility ────────────────────────────────────────────────────
  const [visibleCols, setVisibleCols] = useState<Record<string, boolean>>(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(`${storageKey}:cols`);
        if (saved) return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return Object.fromEntries(columns.map(c => [c.key, c.defaultVisible !== false]));
  });

  useEffect(() => {
    if (storageKey) {
      try { localStorage.setItem(`${storageKey}:cols`, JSON.stringify(visibleCols)); } catch { /* ignore */ }
    }
  }, [visibleCols, storageKey]);

  // ── Column alignment ─────────────────────────────────────────────────────
  const [columnAlign, setColumnAlign] = useState<Record<string, 'left' | 'center' | 'right'>>(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(`${storageKey}:align`);
        if (saved) return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return Object.fromEntries(columns.map(c => [c.key, c.defaultAlign ?? 'left']));
  });

  useEffect(() => {
    if (storageKey) {
      try { localStorage.setItem(`${storageKey}:align`, JSON.stringify(columnAlign)); } catch { /* ignore */ }
    }
  }, [columnAlign, storageKey]);

  // ── Column order ─────────────────────────────────────────────────────────
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(`${storageKey}:order`);
        if (saved) {
          const parsed: string[] = JSON.parse(saved);
          const currentKeys = new Set(columns.map(c => c.key));
          const filtered = parsed.filter(k => currentKeys.has(k));
          const missing = columns.map(c => c.key).filter(k => !filtered.includes(k));
          return [...filtered, ...missing];
        }
      } catch { /* ignore */ }
    }
    return columns.map(c => c.key);
  });

  useEffect(() => {
    if (storageKey) {
      try { localStorage.setItem(`${storageKey}:order`, JSON.stringify(columnOrder)); } catch { /* ignore */ }
    }
  }, [columnOrder, storageKey]);

  const orderedColumns = useMemo(() => {
    const colMap = new Map(columns.map(c => [c.key, c]));
    return columnOrder.map(k => colMap.get(k)).filter((c): c is ColumnDef<TRow> => c !== undefined);
  }, [columnOrder, columns]);

  // ── Drag-to-reorder state ────────────────────────────────────────────────
  const [dragKey, setDragKey] = useState<string | null>(null);
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  const handleDragStart = useCallback((key: string) => {
    setDragKey(key);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOverKey(key);
  }, []);

  const handleDrop = useCallback((targetKey: string) => {
    setDragKey(prev => {
      if (!prev || prev === targetKey) return null;
      setColumnOrder(order => {
        const next = [...order];
        const fromIdx = next.indexOf(prev);
        const toIdx = next.indexOf(targetKey);
        next.splice(fromIdx, 1);
        next.splice(toIdx, 0, prev);
        return next;
      });
      return null;
    });
    setDragOverKey(null);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDragKey(null);
    setDragOverKey(null);
  }, []);

  const handleReset = useCallback(() => {
    const defaultOrder = columns.map(c => c.key);
    const defaultVisible = Object.fromEntries(columns.map(c => [c.key, c.defaultVisible !== false]));
    const defaultAlign = Object.fromEntries(columns.map(c => [c.key, c.defaultAlign ?? 'left']));
    const defaultWidths = Object.fromEntries(columns.map(c => [c.key, c.defaultWidth ?? 150]));
    setColumnOrder(defaultOrder);
    setVisibleCols(defaultVisible);
    setColumnAlign(defaultAlign as Record<string, 'left' | 'center' | 'right'>);
    setColumnWidths(defaultWidths);
    if (storageKey) {
      try {
        localStorage.removeItem(`${storageKey}:cols`);
        localStorage.removeItem(`${storageKey}:align`);
        localStorage.removeItem(`${storageKey}:order`);
      } catch { /* ignore */ }
    }
  }, [columns, storageKey]);

  // ── Pagination ───────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Reset to page 1 when row set changes
  const prevRowCount = useRef(rows.length);
  useEffect(() => {
    if (rows.length !== prevRowCount.current) {
      setCurrentPage(1);
      prevRowCount.current = rows.length;
    }
  }, [rows.length]);

  // ── Column resize ────────────────────────────────────────────────────────
  const [resizing, setResizing] = useState<{ key: string; startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    if (!resizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const col = columns.find(c => c.key === resizing.key);
      const min = col?.minWidth ?? 60;
      setColumnWidths(prev => ({
        ...prev,
        [resizing.key]: Math.max(min, resizing.startWidth + (e.clientX - resizing.startX)),
      }));
    };
    const handleMouseUp = () => setResizing(null);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing, columns]);

  // ── Column configurator ──────────────────────────────────────────────────
  const [showConfigurator, setShowConfigurator] = useState(false);

  useEffect(() => {
    if (!showConfigurator) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowConfigurator(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showConfigurator]);

  const hideableColumns = orderedColumns.filter(c => c.hideable !== false);

  // ── Sort handler ─────────────────────────────────────────────────────────
  const handleSort = useCallback((key: string) => {
    const newDir = activeSortCol === key && activeSortDir === 'asc' ? 'desc' : 'asc';
    if (isControlledSort) {
      onSortChange!(key, newDir);
    } else {
      setInternalSortCol(key);
      setInternalSortDir(newDir);
    }
  }, [activeSortCol, activeSortDir, isControlledSort, onSortChange]);

  // ── Internal sort ────────────────────────────────────────────────────────
  const sortedRows = useMemo(() => {
    const pinned = rowPinBottom ? rows.filter(r => rowPinBottom(r)) : [];
    const sortable = rowPinBottom ? rows.filter(r => !rowPinBottom(r)) : rows;

    if (isControlledSort || !internalSortCol) return rowPinBottom ? [...sortable, ...pinned] : rows;
    const col = columns.find(c => c.key === internalSortCol);
    if (!col?.sortValue) return rowPinBottom ? [...sortable, ...pinned] : rows;

    const sorted = [...sortable].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return internalSortDir === 'asc' ? cmp : -cmp;
    });
    return [...sorted, ...pinned];
  }, [rows, isControlledSort, internalSortCol, internalSortDir, columns, rowPinBottom]);

  // ── Visible columns ──────────────────────────────────────────────────────
  const visibleColumns = orderedColumns.filter(c => visibleCols[c.key] !== false);

  // ── Pagination ───────────────────────────────────────────────────────────
  const hasPagination = pageSizeOptions.length > 0;
  const totalPages = hasPagination ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1;
  const pageRows = hasPagination
    ? sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedRows;

  const pageNumbers = useMemo((): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }, [totalPages, currentPage]);

  const colSpan = visibleColumns.length;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={`${styles.wrapper} ${hideableColumns.length > 0 ? styles.hasConfigurator : ''} ${className ?? ''}`}>
      {hideableColumns.length > 0 && (
        <>
          <div className={styles.configuratorOverlay}>
            <button
              className={`${styles.configuratorBtn} ${showConfigurator ? styles.configuratorBtnActive : ''}`}
              onClick={() => setShowConfigurator(s => !s)}
              title="Configure columns"
            >
              <SlidersIcon />
            </button>
          </div>
          {showConfigurator && createPortal(
            <div className={styles.modalBackdrop} onMouseDown={() => setShowConfigurator(false)}>
              <div className={styles.modal} onMouseDown={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalTitle}>Configure Columns</span>
                  <button className={styles.modalClose} onClick={() => setShowConfigurator(false)}>✕</button>
                </div>
                <div className={styles.modalBody}>
                  {orderedColumns.map(c => (
                    <div
                      key={c.key}
                      className={[
                        styles.configuratorRow,
                        dragKey === c.key ? styles.configuratorRowDragging : '',
                        dragOverKey === c.key && dragOverKey !== dragKey ? styles.configuratorRowDragOver : '',
                      ].filter(Boolean).join(' ')}
                      draggable
                      onDragStart={() => handleDragStart(c.key)}
                      onDragOver={e => handleDragOver(e, c.key)}
                      onDrop={() => handleDrop(c.key)}
                      onDragEnd={handleDragEnd}
                    >
                      <span className={styles.dragHandle}><GripIcon /></span>
                      <label className={styles.configuratorItemCheck}>
                        {c.hideable !== false ? (
                          <input
                            type="checkbox"
                            checked={visibleCols[c.key] !== false}
                            onChange={e => setVisibleCols(prev => ({ ...prev, [c.key]: e.target.checked }))}
                          />
                        ) : (
                          <span className={styles.configuratorItemSpacer} />
                        )}
                        <span>{c.header}</span>
                      </label>
                      <select
                        className={styles.configuratorAlignSelect}
                        value={columnAlign[c.key] ?? 'left'}
                        onChange={e => setColumnAlign(prev => ({ ...prev, [c.key]: e.target.value as 'left' | 'center' | 'right' }))}
                        title="Text alignment"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className={styles.modalFooter}>
                  <button className={styles.configuratorResetBtn} onClick={handleReset}>
                    Reset to defaults
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      )}
      <div className={styles.tableScrollContainer}>
        <table className={styles.table} style={tableLayout === 'auto' ? { tableLayout: 'auto' } : undefined}>
          <thead className={styles.thead}>
            <tr>
              {visibleColumns.map(col => {
                const isSortable = col.sortable !== false &&
                  (col.sortValue !== undefined || isControlledSort);
                const isActive = activeSortCol === col.key;
                const align = columnAlign[col.key] ?? 'left';
                const justifyContent = align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';
                return (
                  <th key={col.key} className={col.headerClassName || undefined} style={tableLayout === 'fixed' ? { width: columnWidths[col.key] } : undefined}>
                    <div className={styles.thContent}>
                      <div
                        className={`${styles.thLabel} ${isSortable ? styles.thSortable : ''}`}
                        style={{ justifyContent }}
                        onClick={isSortable ? () => handleSort(col.key) : undefined}
                      >
                        {isSortable && align === 'right' && (
                          <span className={styles.sortIcon}>
                            {isActive ? (activeSortDir === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />) : null}
                          </span>
                        )}
                        {col.header}
                        {col.headerTooltip && (
                          <span className={styles.headerTooltipIcon} title={col.headerTooltip} aria-label={col.headerTooltip}>?</span>
                        )}
                        {isSortable && align !== 'right' && (
                          <span className={styles.sortIcon}>
                            {isActive ? (activeSortDir === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />) : null}
                          </span>
                        )}
                      </div>
                      <div
                        className={styles.resizeHandle}
                        onMouseDown={e => {
                          e.preventDefault();
                          setResizing({ key: col.key, startX: e.clientX, startWidth: columnWidths[col.key] });
                        }}
                      />
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.length > 0 ? (
              pageRows.map(row => (
                <tr
                  key={rowKey(row)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={[
                    onRowClick ? styles.clickableRow : '',
                    rowClassName ? rowClassName(row) : '',
                  ].filter(Boolean).join(' ')}
                >
                  {visibleColumns.map(col => {
                    const cc = col.cellClassName;
                    const cls = cc ? (typeof cc === 'function' ? cc(row) : cc) : '';
                    return (
                      <td key={col.key} className={cls || undefined} style={{ textAlign: columnAlign[col.key] ?? 'left' }}>{col.cell(row)}</td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={colSpan} className={styles.emptyCell}>
                  {emptyState ?? <EmptyState title="No data" />}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasPagination && sortedRows.length > 0 && (
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerInfo}>
              Showing{' '}
              <strong>{(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, sortedRows.length)}</strong>
              {' '}of {sortedRows.length}
            </span>
            <div className={styles.pageSizeSelector}>
              <label htmlFor="dt-page-size">Rows:</label>
              <select
                id="dt-page-size"
                value={pageSize}
                onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className={styles.pageSizeSelect}
              >
                {pageSizeOptions.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              <ChevronLeftIcon />
            </button>
            {pageNumbers.map((p, i) =>
              p === '...'
                ? <span key={`e${i}`} className={styles.ellipsis}>…</span>
                : (
                  <button
                    key={p}
                    className={`${styles.pageBtn} ${currentPage === p ? styles.pageBtnActive : ''}`}
                    onClick={() => setCurrentPage(p as number)}
                  >
                    {p}
                  </button>
                )
            )}
            <button
              className={styles.pageBtn}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
