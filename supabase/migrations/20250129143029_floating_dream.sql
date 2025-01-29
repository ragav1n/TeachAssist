/*
  # Add profile fields to users table

  1. Changes
    - Add new columns to users table:
      - `school_name` (text)
      - `subjects_taught` (text[])
      - `grade_levels` (text[])
      - `years_of_experience` (integer)
      - `teaching_style` (text)
      - `interests` (text[])
  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'school_name'
  ) THEN
    ALTER TABLE users 
      ADD COLUMN school_name text,
      ADD COLUMN subjects_taught text[] DEFAULT '{}',
      ADD COLUMN grade_levels text[] DEFAULT '{}',
      ADD COLUMN years_of_experience integer DEFAULT 0,
      ADD COLUMN teaching_style text,
      ADD COLUMN interests text[] DEFAULT '{}',
      ADD COLUMN onboarding_completed boolean DEFAULT false;
  END IF;
END $$;