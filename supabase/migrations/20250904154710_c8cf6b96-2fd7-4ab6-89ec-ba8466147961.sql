-- Create goals table
CREATE TABLE public.goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  progress INTEGER DEFAULT 0,
  target_date DATE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create village_members table
CREATE TABLE public.village_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT,
  contact_info TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create priorities table (for daily priorities)
CREATE TABLE public.priorities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority_type TEXT NOT NULL DEFAULT 'medium', -- urgent, high, medium, low
  due_time TEXT,
  is_completed BOOLEAN DEFAULT false,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create celebrations table (for user achievements)
CREATE TABLE public.celebrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATE DEFAULT CURRENT_DATE,
  is_acknowledged BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celebrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for goals
CREATE POLICY "Users can view their own goals" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own goals" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own goals" ON public.goals FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for village_members
CREATE POLICY "Users can view their own village members" ON public.village_members FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own village members" ON public.village_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own village members" ON public.village_members FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own village members" ON public.village_members FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for priorities
CREATE POLICY "Users can view their own priorities" ON public.priorities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own priorities" ON public.priorities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own priorities" ON public.priorities FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own priorities" ON public.priorities FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for celebrations
CREATE POLICY "Users can view their own celebrations" ON public.celebrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own celebrations" ON public.celebrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own celebrations" ON public.celebrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own celebrations" ON public.celebrations FOR DELETE USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON public.goals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_village_members_updated_at BEFORE UPDATE ON public.village_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_priorities_updated_at BEFORE UPDATE ON public.priorities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data for demonstration
INSERT INTO public.goals (user_id, title, category, progress, target_date) VALUES
  (gen_random_uuid(), 'Exercise 3x weekly', 'health', 70, '2024-12-31'),
  (gen_random_uuid(), 'Weekly family time', 'family', 85, '2024-12-31');

INSERT INTO public.village_members (user_id, name, relationship, is_active) VALUES
  (gen_random_uuid(), 'Mom', 'Parent', true),
  (gen_random_uuid(), 'Sarah (neighbor)', 'Neighbor', true),
  (gen_random_uuid(), 'John (partner)', 'Partner', true),
  (gen_random_uuid(), 'Dr. Smith', 'Healthcare Provider', true);