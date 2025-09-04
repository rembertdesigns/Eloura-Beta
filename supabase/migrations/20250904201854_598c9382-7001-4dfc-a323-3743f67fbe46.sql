-- Add foreign key relationship between tasks and village_members
ALTER TABLE public.tasks 
ADD CONSTRAINT fk_tasks_village_member 
FOREIGN KEY (village_member_id) REFERENCES public.village_members(id) ON DELETE SET NULL;