-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive', -- active, inactive, canceled, past_due
  plan_type TEXT NOT NULL DEFAULT 'free', -- free, premium
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_credits table for tracking usage
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_used INTEGER DEFAULT 0,
  credits_limit INTEGER DEFAULT 10,
  reset_date TIMESTAMP WITH TIME ZONE DEFAULT (DATE_TRUNC('month', NOW()) + INTERVAL '1 month'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create usage_logs table for detailed tracking
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'text_search', 'image_search', 'ai_chat', 'recommendation'
  credits_consumed INTEGER DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
ON subscriptions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription"
ON subscriptions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_credits
CREATE POLICY "Users can view their own credits"
ON user_credits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
ON user_credits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
ON user_credits FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for usage_logs
CREATE POLICY "Users can view their own usage logs"
ON usage_logs FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage logs"
ON usage_logs FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Function to create default subscription and credits for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER AS $$
BEGIN
  -- Create default subscription
  INSERT INTO public.subscriptions (user_id, plan_type, status)
  VALUES (new.id, 'free', 'active');
  
  -- Create default credits
  INSERT INTO public.user_credits (user_id, credits_used, credits_limit)
  VALUES (new.id, 0, 10);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users (only if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_subscription'
  ) THEN
    CREATE TRIGGER on_auth_user_created_subscription
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user_subscription();
  END IF;
END
$$;

-- Function to reset monthly credits
CREATE OR REPLACE FUNCTION public.reset_monthly_credits()
RETURNS void AS $$
BEGIN
  UPDATE user_credits 
  SET 
    credits_used = 0,
    reset_date = DATE_TRUNC('month', NOW()) + INTERVAL '1 month',
    updated_at = NOW()
  WHERE reset_date <= NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
