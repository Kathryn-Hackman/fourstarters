export type User = {
    id: string;
    user_id: string;
    name: number;
    email: string;
    password: string;
  };

  export type Story = {
    id: string;
    user_id: string;
    story_text: string;
    status: 'saved' | 'shared';
    date: string;
  };

  export type Square = {
      id: string;
      user_id_self: string;
      user_id_2: string;
      user_id_3: string;
      user_id_4: string;
      square_story_text_self: string;
      square_story_text_2: string;
      square_story_text_3: string;
      square_story_text_4: string;
      date: string;
      status: 'not started' | 'self in progress' | '2 in progress' | '3 in progress' | '4 in progress' | 'completed'
  };