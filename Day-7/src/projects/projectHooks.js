import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from './Project';

export function useProjects() {
  const [page, setPage] = useState(0);
  let queryInfo = useQuery({
    queryKey: ['projects', page],
    queryFn: () => projectAPI.get(page + 1),
    placeholderData: (previousData) => previousData,
    // staleTime: 5000,
  });
  console.log(queryInfo);
  return { ...queryInfo, page, setPage };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project) => {
      if (project.id) {
        return projectAPI.put(project);
      } else {
        const { id, ...projectWithoutId } = project;
        return projectAPI.post(projectWithoutId);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
}