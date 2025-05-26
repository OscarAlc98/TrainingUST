import ProjectForm from '../projects/ProjectForm';
import { Project } from '../projects/Project';

export default function NewProjectPage() {
  // Proyecto vacío inicial
  const emptyProject = new Project({
    id: 0,
    name: '',
    description: '',
    budget: 0,
    isActive: false
  });

  return (
    <>
      <h1>New Project</h1>
      <ProjectForm project={emptyProject} onCancel={() => {}} /> {/* Pasa un onCancel vacío */}
    </>
  );
}
