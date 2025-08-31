export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          age: number | null;
          birth_date: string | null;
          target_age: number | null;
          target_amount: string | null;
          is_onboarding_completed: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          age?: number | null;
          birth_date?: string | null;
          target_age?: number | null;
          target_amount?: string | null;
          is_onboarding_completed?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          age?: number | null;
          birth_date?: string | null;
          target_age?: number | null;
          target_amount?: string | null;
          is_onboarding_completed?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      assets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          type: "cash" | "stock";
          amount: string;
          annual_return: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          type: "cash" | "stock";
          amount?: string;
          annual_return?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          type?: "cash" | "stock";
          amount?: string;
          annual_return?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          amount: string;
          description: string;
          type: "income" | "expense" | "stock_investment";
          from_asset_id: string | null;
          to_asset_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          amount: string;
          description: string;
          type: "income" | "expense" | "stock_investment";
          from_asset_id?: string | null;
          to_asset_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          amount?: string;
          description?: string;
          type?: "income" | "expense" | "stock_investment";
          from_asset_id?: string | null;
          to_asset_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      budget_categories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          amount: string;
          type: "income" | "expense";
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          amount: string;
          type: "income" | "expense";
          start_date: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          amount?: string;
          type?: "income" | "expense";
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stock_investments: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          amount: string;
          start_date: string;
          end_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          amount: string;
          start_date: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          amount?: string;
          start_date?: string;
          end_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      calendar_cache: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          cash_amount: string;
          stock_amount: string;
          total_amount: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          cash_amount: string;
          stock_amount: string;
          total_amount: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          cash_amount?: string;
          stock_amount?: string;
          total_amount?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
