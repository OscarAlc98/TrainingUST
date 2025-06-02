import React, { useEffect, useState } from 'react';
import { useProjects } from './projectHooks';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const {
    data,
    isPending,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPreviousData,
  } = useProjects();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <h1>Projects</h1>

      <input
        type="text"
        placeholder="Search project..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          width: '100%',
          padding: '8px',
          margin: '16px 0',
          fontSize: '16px',
          boxSizing: 'border-box',
        }}
      />

      {data ? (
        <>
          {isFetching && !isPending && <span className="toast">Refreshing...</span>}

          <ProjectList projects={data} searchTerm={searchTerm} />

          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button"
                  onClick={() => setPage(old => old - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (!isPreviousData) setPage(old => old + 1);
                  }}
                  disabled={data.length < 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isPending ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectsPage;
