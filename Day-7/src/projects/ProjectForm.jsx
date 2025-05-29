import PropTypes from 'prop-types';
import { Project } from './Project';
import { useState } from 'react';

function ProjectForm({ project: initialProject, onCancel, onSubmit, isPending }) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({ name: '', description: '', budget: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid()) return;
    const trimmedProject = {
      ...project,
      name: project.name.trim(),
    };
    onSubmit(trimmedProject);
  };

  const handleChange = (event) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === 'checkbox' ? checked : value;
    if (type === 'number') updatedValue = Number(updatedValue);
    const change = { [name]: updatedValue };
    const updatedProject = { ...project, ...change };
    setProject(updatedProject);
    setErrors(validate(updatedProject));
  };

  function validate(project) {
    const errors = { name: '', description: '', budget: '' };
    if (!project.name || project.name.length < 3) errors.name = 'Name is required and must be at least 3 characters.';
    else if (project.name.trim().length !== project.name.length) errors.name = 'Name cannot start or end with spaces.';
    if (!project.description) errors.description = 'Description is required.';
    if (!project.budget || project.budget <= 0) errors.budget = 'Budget must be greater than 0.';
    return errors;
  }

  function isValid() {
    return Object.values(errors).every((error) => error === '');
  }

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      {isPending && <span className="toast">Saving...</span>}
      <label htmlFor="name">Project Name</label>
      <input type="text" name="name" placeholder="Enter name" value={project.name} onChange={handleChange} />
      {errors.name && <div className="card error"><p>{errors.name}</p></div>}
      <label htmlFor="description">Project Description</label>
      <textarea name="description" placeholder="Enter description" value={project.description} onChange={handleChange} />
      {errors.description && <div className="card error"><p>{errors.description}</p></div>}
      <label htmlFor="budget">Project Budget</label>
      <input type="number" name="budget" placeholder="Enter budget" value={project.budget} onChange={handleChange} />
      {errors.budget && <div className="card error"><p>{errors.budget}</p></div>}
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
      <div className="input-group">
        <button className="primary bordered medium" type="submit">Save</button>
        <span />
        <button type="button" className="bordered medium" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

ProjectForm.propTypes = {
  project: PropTypes.instanceOf(Project).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default ProjectForm;
