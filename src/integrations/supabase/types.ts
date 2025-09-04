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
    PostgrestVersion: "12.2.3 (519615d)"
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
      goals: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_completed: boolean | null
          progress: number | null
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: number | null
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean | null
          progress?: number | null
          target_date?: string | null
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
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          family_type: string | null
          full_name: string | null
          household_name: string | null
          id: string
          phone: string | null
          pronouns: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id: string
          phone?: string | null
          pronouns?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          family_type?: string | null
          full_name?: string | null
          household_name?: string | null
          id?: string
          phone?: string | null
          pronouns?: string | null
          updated_at?: string
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
          reminder_time?: string
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
          recurring?: boolean | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          village_member_id?: string | null
        }
        Relationships: []
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
          address: string | null
          challenges: Json | null
          city: string | null
          completed_steps: string[] | null
          created_at: string
          current_step: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          family_type: string | null
          first_name: string | null
          household_name: string | null
          id: string
          last_name: string | null
          onboarding_completed: boolean | null
          phone: string | null
          priorities: Json | null
          pronouns: string | null
          state: string | null
          tour_completed: boolean | null
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          challenges?: Json | null
          city?: string | null
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          family_type?: string | null
          first_name?: string | null
          household_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          priorities?: Json | null
          pronouns?: string | null
          state?: string | null
          tour_completed?: boolean | null
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          challenges?: Json | null
          city?: string | null
          completed_steps?: string[] | null
          created_at?: string
          current_step?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          family_type?: string | null
          first_name?: string | null
          household_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          priorities?: Json | null
          pronouns?: string | null
          state?: string | null
          tour_completed?: boolean | null
          updated_at?: string
          user_id?: string
          zip_code?: string | null
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
      village_members: {
        Row: {
          avatar: string | null
          contact_info: string | null
          created_at: string
          description: string | null
          email: string | null
          group_name: string | null
          id: string
          is_active: boolean | null
          is_online: boolean | null
          name: string
          phone: string | null
          rating: number | null
          rating_count: number | null
          recent_activity: string | null
          relationship: string | null
          roles: string[] | null
          skills: string[] | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          group_name?: string | null
          id?: string
          is_active?: boolean | null
          is_online?: boolean | null
          name: string
          phone?: string | null
          rating?: number | null
          rating_count?: number | null
          recent_activity?: string | null
          relationship?: string | null
          roles?: string[] | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          group_name?: string | null
          id?: string
          is_active?: boolean | null
          is_online?: boolean | null
          name?: string
          phone?: string | null
          rating?: number | null
          rating_count?: number | null
          recent_activity?: string | null
          relationship?: string | null
          roles?: string[] | null
          skills?: string[] | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
