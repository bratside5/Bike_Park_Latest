import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";

const TimeTable = ({ heures }) => {
  const [time, setTime] = useState(heures);

  const memoizedTime = useMemo(() => time, []);

  const keys = Object.keys(...memoizedTime);

  const columns = useMemo(
    () =>
      Object.keys(...memoizedTime)
        .filter((key) => key !== "_id" && key !== "id" && key !== "__v")
        .map((key) => {
          return {
            Header: key.toUpperCase().replace("_", " "),
            accessor: key,
          };
        }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: memoizedTime });

  return (
    <>
      <div className="xs:w-48 md:max-w-full text-xs text-center px-3 flex items-center justify-center">
        <table
          {...getTableProps()}
          className="  bg-gray-100 rounded-lg  sm:shadow-lg my-5"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-teal-400  sm:rounded-none mb-2 "
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="py-3 px-6 text-center"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="" {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="border-grey-light border text-center hover:bg-gray-100 p-3"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimeTable;
