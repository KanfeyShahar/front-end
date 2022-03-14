import React, { Component } from "react";

export class Pagination extends Component {
  render() {
    const {
      postsPerPage,
      totalPosts,
      paginate,
      nextPage,
      prevPage,
      currentPage,
      indexOfFirstPost,
      indexOfLastPost
    } = this.props;

    const pageNumbers = [];
    const Last =Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => prevPage()}>
              הקודם
            </a>
          </li>

          {pageNumbers
            .filter(
              (x) =>
                parseInt(x + 1) === currentPage ||
                parseInt(x + 2) === currentPage ||
                parseInt(x + 3) === currentPage ||
                parseInt(x + 4) === currentPage ||
                parseInt(x + 5) === currentPage ||
                parseInt(x - 2) === currentPage ||
                parseInt(x - 1) === currentPage ||
                parseInt(x - 3) === currentPage ||
                parseInt(x) === currentPage ||
                x === 1 ||
                x === Last
            )
            .map((num) => (
              <li className="page-item" key={num}>
               <a onClick={() => paginate(num)} href="#" className="page-link">
                  {(parseInt(num-3) === currentPage && num !==1 )  ? "..." : num}
                </a>
              </li>
            ))}
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => nextPage()}>
              הבא
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
