/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import 'regenerator-runtime';
import React from 'react';
import { useTable } from 'react-table';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { PageButton } from '../shared/buttons';
import { SortIcon, SortUpIcon, SortDownIcon } from '../shared/icons';

import { BubblePing } from '../shared/loader';
import DateRange from '../shared/date_range';
import { fixZeros } from '../../helpers/changes';

import axios from '../../utils/axios';

const debounce_time = 700;

function TablePagination({ url, columns, action, actionOnFirst, extraButton }) {
  if (!extraButton) {
    extraButton = [];
  }
  if (action) {
    if (actionOnFirst) {
      columns.unshift({
        Header: 'Action',
        Cell: action,
      });
    } else {
      columns.push({
        Header: 'Action',
        Cell: action,
      });
    }
  }
  const columnData = React.useMemo(() => columns, [columns]);

  //-> control
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showPage, setShowPage] = React.useState(10);
  const [sortBy, setSortBy] = React.useState(null);
  const [isSortedDesc, setSortedDesc] = React.useState(false);
  const [filter_search, setFilterSearch] = React.useState({});
  let debounceFilter;
  const onFilterDebounce = (column, e) => {
    const value = e?.target?.value ?? e;
    clearTimeout(debounceFilter);
    debounceFilter = setTimeout(() => {
      setFilterSearch((prevState) => {
        const lastValue = { ...prevState };
        if (value) {
          lastValue[column] = value;
        } else {
          delete lastValue[column];
        }
        return lastValue;
      });
    }, debounce_time);
  };
  const [search, setSearch] = React.useState('');
  let debounceSearch;
  const onSearchDebounce = (e) => {
    const value = e?.target?.value ?? e;
    clearTimeout(debounceSearch);
    debounceSearch = setTimeout(() => {
      setSearch(value);
    }, debounce_time);
  };
  //-> response
  const [data, setData] = React.useState([]);
  const [init, setInit] = React.useState({});
  const [totalData, setTotalData] = React.useState(1);
  const [lastPage, setLastPage] = React.useState(1);
  const [margin, setMargin] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns: columnData,
    data,
  });

  React.useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      let url_compact = `${url}?page=${currentPage}&show=${showPage}`;
      url_compact += sortBy ? `&sort_by=${sortBy}` : '';
      url_compact += isSortedDesc != null ? `&order_by=${isSortedDesc == true ? 'desc' : 'asc'}` : '';
      let f_search = [];
      Object.keys(filter_search).forEach((key) => {
        const value = filter_search[key];
        if (value) {
          f_search.push(`${key}:${value}`);
        }
      });
      if (f_search.length > 0) {
        url_compact += '&filter=' + f_search.join(';');
      }
      if (search) {
        url_compact += '&search=' + search;
      }
      try {
        axios({
          url: url_compact,
        })
          .then((response) => {
            const { status, data: res } = response;
            if (!String(status).startsWith('2')) {
              throw new Error(res.message);
            }
            return res;
          })
          .then((res) => {
            console.log({ res });
            setData(res.data);
            setInit(res.init);
            setTotalData(res.meta.total_data);
            setMargin(res.meta.margin);
            setLastPage(res.meta.last_page);
            setTimeout(() => {
              setLoading(false);
            }, 300);
          })
          .catch((error) => {
            console.log('catch', { error });
          });
      } catch (error) {
        console.log('try-catch', { error });
      }
    }
  }, [currentPage, showPage, sortBy, isSortedDesc, filter_search, search]);

  // Render the UI for your table
  return (
    <>
      <div className="sm:flex sm:gap-x-2">
        <label className="flex items-baseline">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5"
            onChange={(e) => onSearchDebounce(e)}
            placeholder={`Search...`}
          />
        </label>
        {extraButton.map((here) => here)}
      </div>
      {/* table */}
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup, i_header) => (
                    <tr key={i_header} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, i_column) => {
                        const column_name = column.id;
                        const canSortBy = init?.sort && init.sort.find((key) => key == column_name);
                        const canFilterSearch = init?.filter && init.filter.search.find((key) => key == column_name);
                        const canFilterDateRange =
                          init?.filter && init.filter.date_range.find((key) => key == column_name);
                        const canFilterEnum = init?.filter && init.filter.enum.find((key) => key.column == column_name);
                        return (
                          // Add the sorting props to control sorting. For this example
                          // we can add them into the header props
                          <th
                            key={i_column}
                            scope="col"
                            className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <div
                              className="flex items-center justify-between"
                              style={canSortBy ? { cursor: 'pointer' } : {}}
                              onClick={() => {
                                if (!isLoading) {
                                  if (canSortBy) {
                                    if (sortBy == column_name) {
                                      setSortedDesc((prevState) => !prevState);
                                    } else {
                                      setSortBy(column_name);
                                      setSortedDesc(false);
                                    }
                                  }
                                }
                              }}
                            >
                              {column.render('Header')}
                              {/* Add a sort direction indicator */}
                              {canSortBy ? (
                                <span>
                                  {sortBy == column_name ? (
                                    isSortedDesc ? (
                                      <SortDownIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                      <SortUpIcon className="w-4 h-4 text-gray-400" />
                                    )
                                  ) : (
                                    <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                  )}
                                </span>
                              ) : null}
                            </div>
                            {/* Add a filter indicator */}
                            {canFilterEnum ? (
                              <div className="mt-3">
                                <select
                                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  onChange={(e) => onFilterDebounce(column_name, e)}
                                >
                                  <option selected hidden disabled>
                                    Choose a {column.Header}
                                  </option>
                                  {canFilterEnum.option.map((opt, i_opt) => (
                                    <option key={i_opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : canFilterSearch ? (
                              <div className="mt-3">
                                <input
                                  type="text"
                                  name="test"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  placeholder={`Typing a ${column.Header}...`}
                                  onChange={(e) => onFilterDebounce(column_name, e)}
                                />
                              </div>
                            ) : canFilterDateRange ? (
                              <div className="mt-3">
                                <DateRange
                                  onLoad={(e) => {
                                    console.log({ e });
                                  }}
                                  onChange={([start, end]) => {
                                    if (start == 1 && end == 1) {
                                      onFilterDebounce(column_name, null);
                                      return [null, null];
                                    }
                                    const d_start = new Date(start);
                                    const [start_year, start_month, start_date] = [
                                      d_start.getFullYear(),
                                      fixZeros(d_start.getMonth() + 1),
                                      fixZeros(d_start.getDate()),
                                    ];
                                    const d_end = new Date(end);
                                    const [end_year, end_month, end_date] = [
                                      d_end.getFullYear(),
                                      fixZeros(d_end.getMonth() + 1),
                                      fixZeros(d_end.getDate()),
                                    ];
                                    onFilterDebounce(
                                      column_name,
                                      `${start_year}-${start_month}-${start_date}>${end_year}-${end_month}-${end_date}`,
                                    );
                                  }}
                                  cleanable={false}
                                />
                              </div>
                            ) : null}
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={columns.length}>
                        <BubblePing />
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, i_row) => {
                      // new
                      prepareRow(row);
                      return (
                        <tr key={i_row} {...row.getRowProps()}>
                          {row.cells.map((cell, i_cell) => {
                            return (
                              <td
                                key={i_cell}
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                role="cell"
                              >
                                {cell.column.Cell.name === 'defaultRenderer' ? (
                                  <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
                                ) : (
                                  cell.render('Cell')
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
      <div className="py-3 flex items-center justify-between">
        {/* // responsive
        <div className="flex-1 flex justify-between sm:hidden">
          <Button onClick={() => previousPage()} >
            Previous
          </Button>
          <Button onClick={() => nextPage()}>
            Next
          </Button>
        </div> */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline">
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={showPage}
                onChange={(e) => {
                  setShowPage(Number(e.target.value));
                }}
              >
                {[10, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{lastPage}</span>{' '}
              from <span className="font-medium">{totalData}</span> entries
            </span>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {currentPage != 1 ? (
                <>
                  <PageButton
                    className="rounded-l-md"
                    onClick={() => {
                      if (!isLoading) {
                        setCurrentPage(1);
                      }
                    }}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    onClick={() => {
                      if (!isLoading) {
                        setCurrentPage((prevPage) => {
                          return prevPage - 1;
                        });
                      }
                    }}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </PageButton>
                </>
              ) : null}

              {margin.map((page, i) => (
                <PageButton
                  key={i}
                  style={{ paddingLeft: 15, paddingRight: 15 }}
                  onClick={() => {
                    if (!isLoading && currentPage != page) {
                      setCurrentPage(page);
                    }
                  }}
                  active={currentPage == page}
                >
                  {page}
                </PageButton>
              ))}

              {lastPage != currentPage ? (
                <>
                  <PageButton
                    onClick={() => {
                      if (!isLoading) {
                        setCurrentPage((prevPage) => {
                          return prevPage + 1;
                        });
                      }
                    }}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => {
                      if (!isLoading) {
                        setCurrentPage(lastPage);
                      }
                    }}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </PageButton>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default TablePagination;
