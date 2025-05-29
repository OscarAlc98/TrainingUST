import { useState } from 'react';
import ProjectForm from '../projects/ProjectForm';
import { useSaveProject } from '../projects/projectHooks';
import { Project } from '../projects/Project';

export default function NewProjectForm() {
  const [project, setProject] = useState(
    new Project({ name: '', description: '', budget: 0, isActive: true })
  );

  const { mutate: saveProject, isPending } = useSaveProject();

  const handleSubmit = (projectData) => {
    saveProject(projectData, {
      onSuccess: () => {
        setProject(new Project({ name: '', description: '', budget: 0, isActive: true }));
        window.alert('✅ Project created!');
      },
    });
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <ProjectForm project={project} onSubmit={handleSubmit} isPending={isPending} onCancel={() => {}} />
    </div>
  );
}
