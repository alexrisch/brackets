export enum QueryKeys {
  // Bracket Info
  BracketChat = 'BracketChat',
  BracketView = 'BracketView',
  BracketTeam = 'BracketTeam',
  BracketMatchup = 'BracketMatchup',

  // Home Screen
  HotBrackets = 'HotBrackets',
  ActiveBrackets = 'ActiveBrackets',
  RecentBrackets = 'RecentBrackets',

  // Drafts
  DraftBrackets = 'DraftBrackets',

  // Profile
  Profile = 'Profile',
}

export enum MutationKeys {
  // Auth
  SubmitLogin = "SubmitLogin",
  VerifyCodeSubmit = 'VerifyCodeSubmit',
  VerifyCodeResend = 'VerifyCodeResend',
  ForgotPasswordSubmit = 'ForgotPasswordSubmit',
  ForgotPasswordCodeSend = 'ForgotPasswordCodeSend',
  NewPasswordSubmit = 'NewPasswordSubmit',

  // Bracket
  BracketChatMessage = '',
  BracketTeamAdd = '',
  BracketTeamEdit = '',
  BracketMatchupVote = '',
  BracketMatchupFinalize = '',

  // Drafts
  DraftBracketsSave = '',
  DraftBracketsDelete = '',
  DraftBracketsSend = '',

  // Profile
  ProfileDisplayName = '',
  ProfileNotificationChange = '',
}

