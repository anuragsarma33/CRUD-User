import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from "moment";
import Spinner from "../Spinner";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("http://localhost:5000");
      setLoading(false);
      if (resp?.status === 200) {
        setUsers(resp?.data);
        setPaginatedData(_(resp?.data).slice(0).take(pageSize).value());
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const pageCount = users ? Math.ceil(users.length / pageSize) : 0;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(users).slice(startIndex).take(pageSize).value();
    setPaginatedData(paginatedPost);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {_.size(paginatedData || users) <= 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100vh">
              No Data Found
            </div>
          ) : (
            <table className="table mt-5">
              <thead>
                <tr>
                  <th className="user-heading">Name</th>
                  <th className="user-heading">Email</th>
                  <th className="user-heading">Created At</th>
                  <th className="user-heading">Updated at</th>
                  <th className="user-heading">View</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((data, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="d-flex align-items-center gap-10">
                        <div className="avatar-circle">
                          <span className="initials">
                            {data?.username
                              .match(/(\b\S)?/g)
                              .join("")
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>{data?.username}</div>
                      </div>
                    </td>

                    <td>
                      <div className="m-t-10">{data?.email}</div>
                    </td>
                    <td>
                      <div className="m-t-10">
                        {moment(data?.createdAt).format("YYYY-MM-DD h:mma")}
                      </div>
                    </td>
                    <td>
                      <div className="m-t-10">
                        {data?.updatedAt
                          ? moment(data?.updatedAt).format("YYYY-MM-DD h:mma")
                          : "-"}
                      </div>
                    </td>
                    <td>
                      <div className="m-t-10">
                        <Link
                          to={`/user/${data?._id}`}
                          className="text-decoration-none"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!_.size(paginatedData || users) <= 0 && (
            <div className="d-flex justify-content-center">
              <ul className="pagination">
                {pages?.map((page) => (
                  <li
                    key={page}
                    className={
                      page === currentPage
                        ? "user-page-item active"
                        : "user-page-item"
                    }
                  >
                    <p
                      className="user-page-link"
                      onClick={() => pagination(page)}
                    >
                      {page}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllUsers;
