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
      hall_bookings: {
        Row: {
          created_at: string
          customer_email: string
          customer_name: string
          customer_phone: string | null
          event_type: string
          guest_count: number | null
          hall_name: string
          id: string
          notes: string | null
          preferred_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          event_type?: string
          guest_count?: number | null
          hall_name: string
          id?: string
          notes?: string | null
          preferred_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          event_type?: string
          guest_count?: number | null
          hall_name?: string
          id?: string
          notes?: string | null
          preferred_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          id: string
          items: Json
          notes: string | null
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          id?: string
          items: Json
          notes?: string | null
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          id?: string
          items?: Json
          notes?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          available: boolean
          category: string
          created_at: string
          customizable: boolean
          customization_options: Json | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          price: number
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          customizable?: boolean
          customization_options?: Json | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          customizable?: boolean
          customization_options?: Json | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      safiir_applications: {
        Row: {
          admin_notes: string | null
          application_number: string
          created_at: string
          email: string
          full_name: string
          id: string
          nationality: string
          passport_number: string
          passport_scan_url: string | null
          phone: string | null
          photo_url: string | null
          purpose: string | null
          status: string
          total_price: number
          travel_date: string
          updated_at: string
          user_id: string | null
          visa_product_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          application_number: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          nationality: string
          passport_number: string
          passport_scan_url?: string | null
          phone?: string | null
          photo_url?: string | null
          purpose?: string | null
          status?: string
          total_price: number
          travel_date: string
          updated_at?: string
          user_id?: string | null
          visa_product_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          application_number?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          nationality?: string
          passport_number?: string
          passport_scan_url?: string | null
          phone?: string | null
          photo_url?: string | null
          purpose?: string | null
          status?: string
          total_price?: number
          travel_date?: string
          updated_at?: string
          user_id?: string | null
          visa_product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safiir_applications_visa_product_id_fkey"
            columns: ["visa_product_id"]
            isOneToOne: false
            referencedRelation: "safiir_visa_products"
            referencedColumns: ["id"]
          },
        ]
      }
      safiir_contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      safiir_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          nationality: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          nationality?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          nationality?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      safiir_user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["safiir_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["safiir_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["safiir_role"]
          user_id?: string
        }
        Relationships: []
      }
      safiir_visa_products: {
        Row: {
          active: boolean
          category: string
          country: string
          country_flag: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          price: number
          processing_time: string
          required_documents: string[]
          updated_at: string
          visa_type: string
        }
        Insert: {
          active?: boolean
          category?: string
          country: string
          country_flag?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          price?: number
          processing_time: string
          required_documents?: string[]
          updated_at?: string
          visa_type: string
        }
        Update: {
          active?: boolean
          category?: string
          country?: string
          country_flag?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          price?: number
          processing_time?: string
          required_documents?: string[]
          updated_at?: string
          visa_type?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          description: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      TodoList: {
        Row: {
          created_at: string
          id: number
          isCompleted: boolean
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          isCompleted?: boolean
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          isCompleted?: boolean
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          age: number | null
          created_at: string
          email: string | null
          id: number
          name: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
        }
        Update: {
          age?: number | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      safiir_has_role: {
        Args: {
          _role: Database["public"]["Enums"]["safiir_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "registrar" | "viewer"
      safiir_role: "admin" | "staff" | "customer"
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
    Enums: {
      app_role: ["admin", "registrar", "viewer"],
      safiir_role: ["admin", "staff", "customer"],
    },
  },
} as const
