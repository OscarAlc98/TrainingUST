import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectAPI } from './projectAPI';
import { Project } from './Project';
import { useState } from 'react';

export function useProjects() {
  const [page, setPage] = useState(0);
  const limit = 10;

  const queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(page + 1, limit),
    keepPreviousData: true,
  });

  return { ...queryInfo, page, setPage };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project) => {
      const { id, ...projectWithoutId } = project;
      if (id && id !== 0) {
        console.log('Enviando proyecto al backend (PUT):', projectWithoutId);
        return projectAPI.put({ ...projectWithoutId, id });
      } else {
        console.log('Enviando proyecto al backend (POST):', projectWithoutId);
        return projectAPI.post(projectWithoutId);
      }
    },
    onSuccess: () => {
      console.log('Proyecto guardado');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => projectAPI.delete(id),
    onSuccess: () => {
      console.log('Proyecto eliminado');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
