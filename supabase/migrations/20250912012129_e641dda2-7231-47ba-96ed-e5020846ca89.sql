-- Add indexes for planner search and filtering performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tasks_search ON tasks USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_search ON events USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_goals_search ON goals USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Add indexes for filtering by common fields
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tasks_user_category_date ON tasks(user_id, category, due_date);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_events_user_category_date ON events(user_id, category, start_time);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_goals_user_category_date ON goals(user_id, category, target_date);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_tasks_user_status ON tasks(user_id, status, completed);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_goals_user_status ON goals(user_id, is_completed);