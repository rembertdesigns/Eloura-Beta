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
          category: string | null
          completed: boolean | null
          created_at: string
          delegated_to: string | null
          description: string | null
          due_date: string | null
          id: string
          is_urgent: boolean | null
          priority: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          completed?: boolean | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          priority?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          completed?: boolean | null
          created_at?: string
          delegated_to?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          is_urgent?: boolean | null
          priority?: string | null
          title?: string
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
      village_members: {
        Row: {
          contact_info: string | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          relationship: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          relationship?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          relationship?: string | null
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
