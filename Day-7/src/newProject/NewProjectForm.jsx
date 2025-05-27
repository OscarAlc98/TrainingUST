import { useState } from 'react';
import ProjectForm from '../projects/ProjectForm';
import { useSaveProject } from '../projects/projectHooks';
import { Project } from '../projects/Project';

export default function NewProjectForm() {
  const [project, setProject] = useState(
    new Project({
      id: 0,
      name: '',
      description: '',
      budget: 0,
      isActive: true,
    })
  );

  const { mutate: saveProject, isPending } = useSaveProject({
  onSuccess: () => {
    // Limpia el formulario aquí
    setProject({
      id: 0,
      name: '',
      description: '',
      budget: 0,
      isActive: true,
      contractSignedOn: '',
      imageUrl: '',
    });
  },
});


  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;
    const updatedValue = type === 'checkbox' ? checked : value;

    setProject((prevProject) => ({
      ...prevProject,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveProject(project, {
      onSuccess: () => {
        setProject(
          new Project({
            id: 0,
            name: '',
            description: '',
            budget: 0,
            isActive: true,
          })
        );
      },
    });
  };

  return (
    <div>
      <h1>Create new project</h1>
      <ProjectForm
        project={project}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isPending={isPending}
      />
    </div>
  );
}
