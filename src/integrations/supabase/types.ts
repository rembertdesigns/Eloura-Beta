export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          category: string | null
          created_at: string
          description: string | null
          earned_date: string
          icon: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          category?: string | null
          created_at?: string
          description?: string | null
          earned_date?: string
          icon?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          category?: string | null
          created_at?: string
          description?: string | null
          earned_date?: string
          icon?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      celebrations: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          id: string
          is_acknowledged: boolean | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          is_acknowledged?: boolean | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          id?: string
          is_acknowledged?: boolean | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          message_content: string
          sender: string
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_content: string
          sender: string
          session_id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_content?: string
          sender?: string
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      communication_logs: {
        Row: {
          category: string | null
          contact_name: string
          created_at: string
          id: string
          logged_by: string | null
          notes: string
          type: string
          updated_at: string
          user_id: string
          village_member_id: string | null
        }
        Insert: {
          category?: string | null
          contact_name: string
          created_at?: string
          id?: string
          logged_by?: string | null
          notes: string
          type: string
          updated_at?: string
          user_id: string
          village_member_id?: string | null
        }
        Update: {
          category?: string | null
          contact_name?: string
          created_at?: string
          id?: string
          logged_by?: string | null
          notes?: string
          type?: string
          updated_at?: string
          user_id?: string
          village_member_id?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          is_pinned: boolean | null
          joined_at: string | null
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          is_pinned?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          is_pinned?: boolean | null
          joined_at?: string | null
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_group: boolean | null
          last_message: string | null
          last_message_at: string | null
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_group?: boolean | null
          last_message?: string | null
          last_message_at?: string | null
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          location: string | null
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          recurring: boolean | null
          start_time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          start_time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          location?: string | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      family_members: {
        Row: {
          created_at: string
          date_of_birth: string | null
          gender: string | null
          id: string
          is_primary_caregiver: boolean | null
          name: string
          notes: string | null
          relationship: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          is_primary_caregiver?: boolean | null
          name: string
          notes?: string | null
          relationship: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          gender?: string | null
          id?: string
          is_primary_caregiver?: boolean | null
          name?: string
          notes?: string | null
          relationship?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      goal_activity_log: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string
          goal_id: string
          id: string
          user_id: string
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string
          goal_id: string
          id?: string
          user_id: string
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string
          goal_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      goal_completions: {
        Row: {
          completed_at: string
          created_at: string
          goal_id: string
          id: string
          streak_count: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          goal_id: string
          id?: string
          streak_count?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          goal_id?: string
          id?: string
          streak_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      goal_reflections: {
        Row: {
          challenges_faced: string | null
          completion_id: string
          created_at: string
          goal_id: string
          id: string
          lessons_learned: string | null
          rating: number | null
          reflection_text: string | null
          updated_at: string
          user_id: string
          what_helped: string | null
          would_do_again: boolean | null
        }
        Insert: {
          challenges_faced?: string | null
          completion_id: string
          created_at?: string
          goal_id: string
          id?: string
          lessons_learned?: string | null
          rating?: number | null
          reflection_text?: string | null
          updated_at?: string
          user_id: string
          what_helped?: string | null
          would_do_again?: boolean | null
        }
        Update: {
          challenges_faced?: string | null
          completion_id?: string
          created_at?: string
          goal_id?: string
          id?: string
          lessons_learned?: string | null
          rating?: number | null
          reflection_text?: string | null
          updated_at?: string
          user_id?: string
          what_helped?: string | null
          would_do_again?: boolean | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          best_streak: number | null
          category: string | null
          completion_count: number | null
          created_at: string
          current_streak: number | null
          description: string | null
          id: string
          is_completed: boolean | null
          is_recurring: boolean | null
          last_completed_at: string | null
          progress: number | null
          sharing_enabled: boolean | null
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          best_streak?: number | null
          category?: string | null
          completion_count?: number | null
          created_at?: string
          current_streak?: number | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          is_recurring?: boolean | null
          last_completed_at?: string | null
          progress?: number | null
          sharing_enabled?: boolean | null
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          best_streak?: number | null
          category?: string | null
          completion_count?: number | null
          created_at?: string
          current_streak?: number | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          is_recurring?: boolean | null
          last_completed_at?: string | null
          progress?: number | null
          sharing_enabled?: boolean | null
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      help_request_templates: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_custom: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_custom?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_custom?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      help_requests: {
        Row: {
          category: string
          created_at: string
          date: string
          description: string | null
          id: string
          responses_count: number | null
          status: string
          time: string | null
          title: string
          updated_at: string
          urgent: boolean | null
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date: string
          description?: string | null
          id?: string
          responses_count?: number | null
          status?: string
          time?: string | null
          title: string
          updated_at?: string
          urgent?: boolean | null
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          responses_count?: number | null
          status?: string
          time?: string | null
          title?: string
          updated_at?: string
          urgent?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string | null
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          created_at: string
          date: string
          description: string | null
          id: string
          is_highlight: boolean | null
          milestone_type: string
          related_goal_id: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_highlight?: boolean | null
          milestone_type: string
          related_goal_id?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          is_highlight?: boolean | null
          milestone_type?: string
          related_goal_id?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      priorities: {
        Row: {
          created_at: string
          date: string | null
          description: string | null
          due_time: string | null
          id: string
          is_completed: boolean | null
          priority_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          description?: string | null
          due_time?: string | null
          id?: string
          is_completed?: boolean | null
          priority_type?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string | null
          description?: string | null
          due_time?: string | null
          id?: string
          is_completed?: boolean | null
          priority_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          family_type: string | null
          full_name: string | null
          household_name: string | null
          id: string
          phone: string | null
          pronouns: string | null
          state: string | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id: string
          phone?: string | null
          pronouns?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id?: string
          phone?: string | null
          pronouns?: string | null
          state?: string | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      reflections: {
        Row: {
          challenges: string | null
          created_at: string
          id: string
          lessons_learned: string | null
          next_plans: string | null
          period_end: string
          period_start: string
          reflection_type: string
          updated_at: string
          user_id: string
          went_well: string | null
        }
        Insert: {
          challenges?: string | null
          created_at?: string
          id?: string
          lessons_learned?: string | null
          next_plans?: string | null
          period_end: string
          period_start: string
          reflection_type: string
          updated_at?: string
          user_id: string
          went_well?: string | null
        }
        Update: {
          challenges?: string | null
          created_at?: string
          id?: string
          lessons_learned?: string | null
          next_plans?: string | null
          period_end?: string
          period_start?: string
          reflection_type?: string
          updated_at?: string
          user_id?: string
          went_well?: string | null
        }
        Relationships: []
      }
      reminders: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          id: string
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          recurring: boolean | null
          reminder_time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          reminder_time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          reminder_time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_content: {
        Row: {
          category: string
          content: string
          created_at: string
          date_saved: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          date_saved?: string
          id?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          date_saved?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          attachments: string[] | null
          category: string | null
          completed: boolean | null
          created_at: string
          delegated_to: string | null
          description: string | null
          due_date: string | null
          id: string
          is_urgent: boolean | null
          last_update: string | null
          notes: string | null
          priority: string | null
          progress: number | null
          recurrence_end_date: string | null
          recurrence_pattern: string | null
          recurring: boolean | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          village_member_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          attachments?: string[] | null
          category?: string | null
          completed?: boolean | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          last_update?: string | null
          notes?: string | null
          priority?: string | null
          progress?: number | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          village_member_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          attachments?: string[] | null
          category?: string | null
          completed?: boolean | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          last_update?: string | null
          notes?: string | null
          priority?: string | null
          progress?: number | null
          recurrence_end_date?: string | null
          recurrence_pattern?: string | null
          recurring?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          village_member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_tasks_village_member"
            columns: ["village_member_id"]
            isOneToOne: false
            referencedRelation: "village_members"
            referencedColumns: ["id"]
          },
        ]
      }
      time_tracking: {
        Row: {
          activity_name: string
          activity_type: string
          created_at: string
          date: string
          duration_minutes: number
          event_id: string | null
          id: string
          task_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_name: string
          activity_type: string
          created_at?: string
          date?: string
          duration_minutes?: number
          event_id?: string | null
          id?: string
          task_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_name?: string
          activity_type?: string
          created_at?: string
          date?: string
          duration_minutes?: number
          event_id?: string | null
          id?: string
          task_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tips: {
        Row: {
          category: string | null
          content: string
          created_at: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: []
      }
      toolkit_items: {
        Row: {
          attachments: Json | null
          category: string
          content: string | null
          created_at: string
          id: string
          item_type: string
          shared_with: string[] | null
          title: string
          updated_at: string
          user_id: string
          visibility: string | null
        }
        Insert: {
          attachments?: Json | null
          category: string
          content?: string | null
          created_at?: string
          id?: string
          item_type: string
          shared_with?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          visibility?: string | null
        }
        Update: {
          attachments?: Json | null
          category?: string
          content?: string | null
          created_at?: string
          id?: string
          item_type?: string
          shared_with?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          visibility?: string | null
        }
        Relationships: []
      }
      user_onboarding: {
        Row: {
          challenges: Json | null
          completed_steps: string[] | null
          created_at: string
          current_step: string | null
          family_type: string | null
          household_name: string | null
          id: string
          onboarding_completed: boolean | null
          priorities: Json | null
          pronouns: string | null
          tour_completed: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          challenges?: Json | null
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          family_type?: string | null
          household_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          priorities?: Json | null
          pronouns?: string | null
          tour_completed?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          challenges?: Json | null
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          family_type?: string | null
          household_name?: string | null
          id?: string
          onboarding_completed?: boolean | null
          priorities?: Json | null
          pronouns?: string | null
          tour_completed?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_patterns: {
        Row: {
          confidence_score: number | null
          created_at: string
          date_computed: string
          id: string
          pattern_description: string | null
          pattern_name: string
          pattern_type: string
          pattern_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          date_computed?: string
          id?: string
          pattern_description?: string | null
          pattern_name: string
          pattern_type: string
          pattern_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          date_computed?: string
          id?: string
          pattern_description?: string | null
          pattern_name?: string
          pattern_type?: string
          pattern_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          assistant_personality: string | null
          conversation_topics: Json | null
          created_at: string
          id: string
          notification_preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assistant_personality?: string | null
          conversation_topics?: Json | null
          created_at?: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assistant_personality?: string | null
          conversation_topics?: Json | null
          created_at?: string
          id?: string
          notification_preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      village_invitations: {
        Row: {
          accepted_at: string | null
          accepted_by_user_id: string | null
          created_at: string
          expires_at: string
          id: string
          invitation_token: string
          invited_email: string
          invited_name: string
          inviter_id: string
          personal_message: string | null
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by_user_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_email: string
          invited_name: string
          inviter_id: string
          personal_message?: string | null
          role: string
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by_user_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          invitation_token?: string
          invited_email?: string
          invited_name?: string
          inviter_id?: string
          personal_message?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      village_members: {
        Row: {
          avatar: string | null
          color_tag: string | null
          contact_info: string | null
          contact_preferences: Json | null
          created_at: string
          custom_role_descriptions: Json | null
          custom_skill_descriptions: Json | null
          description: string | null
          detailed_availability: Json | null
          email: string | null
          emergency_status: string | null
          extra_notes: string | null
          group_name: string | null
          history_notes: string | null
          id: string
          invitation_sent_at: string | null
          invited_as_user: boolean | null
          is_active: boolean | null
          is_online: boolean | null
          languages: string[] | null
          location: string | null
          name: string
          neighborhood: string | null
          phone: string | null
          profile_photo_url: string | null
          rating: number | null
          rating_count: number | null
          recent_activity: string | null
          relationship: string | null
          roles: string[] | null
          skills: string[] | null
          status: string | null
          support_type: string | null
          trust_level: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          color_tag?: string | null
          contact_info?: string | null
          contact_preferences?: Json | null
          created_at?: string
          custom_role_descriptions?: Json | null
          custom_skill_descriptions?: Json | null
          description?: string | null
          detailed_availability?: Json | null
          email?: string | null
          emergency_status?: string | null
          extra_notes?: string | null
          group_name?: string | null
          history_notes?: string | null
          id?: string
          invitation_sent_at?: string | null
          invited_as_user?: boolean | null
          is_active?: boolean | null
          is_online?: boolean | null
          languages?: string[] | null
          location?: string | null
          name: string
          neighborhood?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          rating?: number | null
          rating_count?: number | null
          recent_activity?: string | null
          relationship?: string | null
          roles?: string[] | null
          skills?: string[] | null
          status?: string | null
          support_type?: string | null
          trust_level?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string | null
          color_tag?: string | null
          contact_info?: string | null
          contact_preferences?: Json | null
          created_at?: string
          custom_role_descriptions?: Json | null
          custom_skill_descriptions?: Json | null
          description?: string | null
          detailed_availability?: Json | null
          email?: string | null
          emergency_status?: string | null
          extra_notes?: string | null
          group_name?: string | null
          history_notes?: string | null
          id?: string
          invitation_sent_at?: string | null
          invited_as_user?: boolean | null
          is_active?: boolean | null
          is_online?: boolean | null
          languages?: string[] | null
          location?: string | null
          name?: string
          neighborhood?: string | null
          phone?: string | null
          profile_photo_url?: string | null
          rating?: number | null
          rating_count?: number | null
          recent_activity?: string | null
          relationship?: string | null
          roles?: string[] | null
          skills?: string[] | null
          status?: string | null
          support_type?: string | null
          trust_level?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      secure_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          birth_year_only: string | null
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          family_type: string | null
          full_name: string | null
          household_name: string | null
          id: string | null
          phone: string | null
          pronouns: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: never
          avatar_url?: string | null
          birth_year_only?: never
          city?: never
          created_at?: string | null
          date_of_birth?: never
          emergency_contact_name?: never
          emergency_contact_phone?: never
          emergency_contact_relationship?: never
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id?: string | null
          phone?: never
          pronouns?: string | null
          state?: never
          updated_at?: string | null
          zip_code?: never
        }
        Update: {
          address?: never
          avatar_url?: string | null
          birth_year_only?: never
          city?: never
          created_at?: string | null
          date_of_birth?: never
          emergency_contact_name?: never
          emergency_contact_phone?: never
          emergency_contact_relationship?: never
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id?: string | null
          phone?: never
          pronouns?: string | null
          state?: never
          updated_at?: string | null
          zip_code?: never
        }
        Relationships: []
      }
    }
    Functions: {
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_masked_profile_data: {
        Args: { profile_id: string }
        Returns: {
          address_masked: string
          avatar_url: string
          family_type: string
          full_name: string
          household_name: string
          id: string
          phone_masked: string
          pronouns: string
        }[]
      }
      is_conversation_participant: {
        Args: { _conversation_id: string; _user_id: string }
        Returns: boolean
      }
      log_pii_access: {
        Args: {
          accessed_user_id: string
          accessor_user_id?: string
          table_name: string
        }
        Returns: undefined
      }
      log_security_event: {
        Args: { details?: Json; event_type: string; user_id?: string }
        Returns: undefined
      }
      mask_pii: {
        Args: { data: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
