import Link from "next/link";
import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import slugify from "slugify";

const DataTable = ({ geoJson }) => {
  const [geoData, setGeoData] = useState([geoJson]);
  const mapped = geoData[0].features.map((data) => {
    return data.properties;
  });

  // console.log(geoData);
  // const getSlugs = geoData[0].features.map((data) => {
  //   return data.properties.Nom;
  // });
  // console.log(getSlugs);
  // let slug;
  // slug = getSlugs;
  // const url = slugify(slug, { lower: true, strict: true });
  // console.log(`Slug is ${url}`);

  const memoizedGeoData = React.useMemo(() => mapped, []);

  // console.log(memoizedGeoData);

  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "Nom",
      },
      {
        Header: "Difficulté",
        accessor: "Difficulté",
      },
      {
        Header: "Type",
        accessor: "Type",
      },
      {
        Header: "Secteur",
        accessor: "Secteur",
      },

      //   {
      //     Header: "Colour",
      //     accessor: "Colour",
      //   },
      //   {
      //     Header: "Distance",
      //     accessor: "Distance",
      //   },
      //   {
      //     Header: "Dénivelé",
      //     accessor: "Dénivelé",
      //   },
    ],
    []
  );
  const data = React.useMemo(() => memoizedGeoData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container xs:w-48 md:max-w-full text-xs text-left px-3 flex items-center justify-center">
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
                  className="py-3 px-6 text-left"
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
                      className="border-grey-light border text-left hover:bg-gray-100 p-3"
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
  );
};

export default DataTable;
