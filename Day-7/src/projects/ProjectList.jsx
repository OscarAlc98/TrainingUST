import { useState } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useSaveProject, useDeleteProject } from './projectHooks';

function ProjectList({ projects }) {
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

  const items = projects.map((project) => (
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
  ));

  return <div className="row">{items}</div>;
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
};

export default ProjectList;
