import { useState } from 'react';
import PropTypes from 'prop-types';
import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { useSaveProject } from './projectHooks';

function ProjectList({ projects }) {
  const [projectBeingEdited, setProjectBeingEdited] = useState(null);

  const { mutate: saveProject, isPending } = useSaveProject();

  const handleEdit = (project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited(null);
  };

  const handleSave = (project) => {
    const plainProject = { ...project }; // destruye el Proxy
    saveProject(plainProject, {
      onSettled: () => {
        console.log('onSettled ejecutado');
        setProjectBeingEdited(null);
      },
    });
  };

  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      {projectBeingEdited && project.id === projectBeingEdited.id ? (
        <ProjectForm
          project={projectBeingEdited}
          onCancel={cancelEditing}
          onSubmit={handleSave}
          isPending={isPending}
        />
      ) : (
        <ProjectCard project={project} onEdit={handleEdit} />
      )}
    </div>
  ));

  return <div className="row">{items}</div>;
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
};

export default ProjectList;
