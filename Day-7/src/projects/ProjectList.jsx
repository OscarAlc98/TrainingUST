// ProjectList.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useSaveProject, useDeleteProject } from './projectHooks';

function ProjectList({ projects, searchTerm }) {
  const [projectBeingEdited, setProjectBeingEdited] = useState(null);
  const { mutate: saveProject, isPending } = useSaveProject();
  const { mutate: deleteProject } = useDeleteProject();

  const handleEdit = (project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited(null);
  };

  const handleSave = (project) => {
    saveProject(project, {
      onSuccess: () => {
        setProjectBeingEdited(null);
      },
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this project?')) {
      deleteProject(id);
    }
  };

  // Filtrado por término de búsqueda (sólo frontend)
  const term = searchTerm.trim().toLowerCase();
  const filteredProjects = term
    ? projects.filter((proj) =>
        proj.name.toLowerCase().includes(term) ||
        proj.description.toLowerCase().includes(term)
      )
    : projects;

  if (filteredProjects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div className="row">
      {filteredProjects.map((project) => (
        <div key={project.id} className="cols-sm">
          {projectBeingEdited?.id === project.id ? (
            <ProjectForm
              project={projectBeingEdited}
              onCancel={cancelEditing}
              onSubmit={handleSave}
              isPending={isPending}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
  searchTerm: PropTypes.string,
};

ProjectList.defaultProps = {
  searchTerm: '',
};

export default ProjectList;
