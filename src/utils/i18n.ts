import { AppLanguage } from '../types';

export const TRANSLATIONS = {
  en: {
    // Navigation
    navHome: 'Home',
    navChat: 'Chat',
    navProfile: 'Profile',

    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    search: 'Search',
    settings: 'Settings',
    language: 'Language',
    model: 'AI Model',
    selectModel: 'Select Model',
    active: 'Active',
    level: 'Lv.',
    msgs: 'msgs',

    // Home Tab
    appName: 'Berry',
    appTagline: 'Choose a companion to start talking',
    officialCompanions: 'Official Companions',
    availableCount: 'Available',
    permanentNote: 'Permanent companion profiles',
    searchPlaceholderHome: 'Search companions by name, personality, or trait...',
    talkChat: 'Chat',
    talkMeet: 'Meet',
    viewProfile: 'Profile',
    noCompanionsFound: 'No companions found matching your search.',

    // Chat Tab
    chatsTitle: 'Chats',
    addCharacter: 'Add Character',
    searchChats: 'Search conversations...',
    noChatsTitle: 'No active chats yet',
    noChatsDesc: 'Start a conversation with an official companion from the Home tab or create your own custom companion!',
    browseCompanions: 'Browse Companions',
    recent: 'Recent',
    official: 'Official',
    custom: 'Custom',
    deleteChatConfirmTitle: 'Delete Character & Chat?',
    deleteChatConfirmDesc: 'Are you sure you want to delete this character and all conversation history? This cannot be undone.',
    noMessagesYet: 'No messages yet',

    // Header
    chatMode: 'Chat',
    meetMode: 'Meet',
    chapters: 'Chapters',
    bookmarks: 'Bookmarks',
    profileBtn: 'Profile & Stats',
    backToHome: 'Back to all messages',

    // Chapter Sheet
    storyChapters: 'Story Chapters',
    createNewChapter: 'Create New Chapter',
    deleteChapter: 'Delete Chapter',
    deleteChapterConfirm: 'Are you sure you want to delete this chapter and its messages?',
    chapter: 'Chapter',

    // Profile Tab
    myProfile: 'My Profile',
    profileSubtitle: 'Manage your identity shared with AI companions',
    yourName: 'Your Name',
    namePlaceholder: 'e.g. Sky',
    aboutYou: 'About You (Shared with AI Companions)',
    aboutYouPlaceholder: 'Share your interests, hobbies, work, and lifestyle so companions know you deeply...',
    saveProfile: 'Save Profile',
    profileSaved: 'Profile saved & synced with AI!',
    changePhoto: 'Change Photo',
    gender: 'Gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    totalCompanions: 'Companions',
    totalMessages: 'Messages',
    savedBookmarks: 'Bookmarks',
    settingsAndBackups: 'App Settings & Backups',

    // Settings Modal
    appSettings: 'Application Settings',
    aiModelSelection: 'AI Model Selection',
    aiModelSubtitle: 'Choose which Gemini model powers your conversations:',
    geminiApiKeys: 'Google AI API Keys',
    apiKeysNotice: 'No pre-filled keys. Enter your Google AI API key (AIza... or AQ.xxx format):',
    apiKeyBanner: 'Add your free Gemini API key to start chatting with companions.',
    apiKeyBannerAction: 'Open Settings',
    apiKeyBannerDismiss: "Don't show again",
    apiKeysPlaceholder: 'Enter your Google AI API key (AIza or AQ. format)...',
    testKeys: 'Verify Keys',
    languageSection: 'Language / ဘာသာစကား',
    saveSettings: 'Save Settings',
    settingsSavedMessage: 'Settings saved successfully!',
    backupData: 'Data Management & Backup',
    exportBackup: 'Export Backup (JSON)',
    importBackup: 'Import Backup (JSON)',
    exportTxt: 'Export Chat (.TXT)',
    exportMd: 'Export Chat (.MD)',
    clearKeyPlaceholder: 'No API key pre-filled. Enter key to use.',

    // Chat / Real Mode
    typeMessage: 'Type a message...',
    send: 'Send',
    aiTyping: 'typing...',
    openingScene: 'Arriving at meeting scene...',

    // Bookmarks Drawer
    bookmarksTitle: 'Saved Bookmarks',
    closeBookmarks: 'Close bookmarks',
    noBookmarksSaved: 'No Bookmarks Saved',
    bookmarksEmptyDesc: 'Click the bookmark icon on any message in chat or story mode to save memorable quotes here.',
    deleteBookmark: 'Delete bookmark',

    // Chat Mode View
    startChatWith: 'Start chatting with',
    startChatDesc: 'Send a text or photo to start your conversation. Switch to Real Mode at any time to meet face-to-face!',
    completed: 'Completed',
    viewMeetDetails: 'View Meet Mode details (read-only)',
    attachPhoto: 'Attach Photo',
    removeImage: 'Remove image',
    uploadPreview: 'Upload preview',
    sendMessage: 'Send Message',
    bookmark: 'Bookmark',
    removeBookmark: 'Remove Bookmark',
    editMessage: 'Edit Message',
    deleteMessage: 'Delete Message',
    you: 'You',
    preview: 'Preview',

    // Real Mode View
    inPersonEncounterMode: 'In-Person Encounter Mode',
    endMeetMode: 'End Meet Mode',
    sceneSetting: 'Scene Setting: ',
    settingUpEncounter: 'Setting up in-person encounter with',
    generatingSceneDesc: 'Generating scene setting, atmosphere, and dialogue based on your chats',
    reactingToYou: 'is reacting to you in this moment...',
    actionLabel: 'Action (*action*)',
    speechLabel: 'Speech ("dialogue")',
    actionPlaceholder: 'Describe your action (e.g. smile warmly, reach for her hand)...',
    speechPlaceholder: 'Say something aloud face-to-face...',
    normalPlaceholder: 'Respond or describe what you do...',
    sendToScene: 'Send to Scene',
    bookmarkScene: 'Bookmark Scene',
    sceneVisual: 'Scene visual',
    encounterSummaryTitle: 'Encounter Summary & Bonding',
    meetAgainHint: 'To meet in person again, tap Meet Mode',

    // Story Mode View
    startStoryMode: 'Start Story Mode',
    newStory: 'New Story',
    continueStory: 'Continue',
    storyMode: 'Story Mode',
    gameMaster: 'Game Master',
    chooseGenre: 'Choose your adventure genre',
    exitStory: 'Exit Story',
    gameMode: 'Game Mode',
    gameModeDesc: 'Play an endless choose-your-own-adventure, separate from your companions',
    surpriseMe: '🎲 Surprise me',
    customGenrePlaceholder: 'Or type your own story genre / idea...',
    customGenreStart: '▶ Start Story',
    yourAction: 'Your action...',
    typeCustomAction: 'or type your own action',
    takeAction: 'Take this action',
    storyOpening: 'Weaving the opening scene...',
    gmTyping: 'The Game Master is weaving the next chapter...',
    noStoriesYet: 'No adventures saved yet. Start one with the + button!',
    yourTurn: 'What do you do?',

    // Character Modal
    characterDetails: 'Character Details',
    editCompanion: 'Edit Companion',
    createNewCompanion: 'Create New Companion',
    avatarSelection: 'Avatar Selection',
    uploadPhoto: 'Upload Photo',
    uploadCustomAvatar: 'Upload custom avatar',
    preset: 'Preset',
    chatBackground: 'Chat Background',
    setWallpaper: 'Set Wallpaper',
    changeWallpaper: 'Change Wallpaper',
    remove: 'Remove',
    nameLabel: 'Name',
    nameCharPlaceholder: 'e.g. Reina',
    relationshipLabel: 'Relationship',
    relationshipPlaceholder: 'e.g. Close Friend / Crush',
    personalityLabel: 'Personality',
    personalityPlaceholder: 'e.g. Sweet, artistic, easily blushing, loves watercolor painting',
    backstoryLabel: 'Background Story',
    backstoryPlaceholder: 'e.g. 20-year-old fine arts university student who loves cozy cafes',
    aiModelLabel: 'AI Model',
    modelDefaultOption: 'Gemini 3.8 Flash (Default - Fast & High Quality)',
    modelLiteOption: 'Gemini 3.5 Flash Lite (Ultra-Low Latency)',
    memoriesLabel: 'Memories About Partner (Never Forgot)',
    memoryPlaceholder: 'e.g. Loves drinking warm matcha latte',
    add: 'Add',
    removeMemory: 'Remove memory',
    systemPromptLabel: 'System Prompt (Optional Custom Override)',
    systemPromptPlaceholder: 'Leave blank to use default dual-mode uncensored system instructions...',
    deleteCharConfirm: 'Delete',
    saveCompanion: 'Save Companion',

    // Profile Modal
    characterProfile: 'Character Profile',
    closeProfile: 'Close profile',
    officialCompanion: 'Official Companion',
    levelLabel: 'Level',
    relationWithYou: 'Relation with you:',
    closeCompanion: 'Close Companion',
    characterTraits: 'Character Traits',
    affection: 'Affection',
    affectionDesc: 'Increases as you chat & meet',
    chatStreak: 'Chat Streak',
    days: 'Days',
    backstorySection: 'Backstory',
    backstoryFallback: 'A gentle companion ready to connect with you.',
    speakingStyleSection: 'Speaking Style',
    noMemoriesLogged: 'No specific memories logged yet.',
    chatOnline: 'Chat Online',
    meetUp: 'Meet Up',

    // PWA Install
    tapShare: 'Tap the',
    shareWord: 'Share',
    shareButtonBottom: 'button at the bottom of Safari.',
    addToHomeScreen: 'Add to Home Screen',
    scrollDownSelect: 'Scroll down and select',
    tapWord: 'Tap',
    addWord: 'Add',
    addInTopRight: 'in the top right. Berry AI will open like a native app on your home screen!',

    // Settings
    pwaReady: 'PWA Ready',

    // Header extras
    donate: 'Donate',
    likeCharacter: 'Like character',
    switchLanguage: 'Switch language',
    switchToMeetMode: 'Switch to Meet Mode',
    switchToChatMode: 'Switch to Chat Mode',
    liked: 'Liked',
    donateWithKbzpay: 'Donate with KBZPay',
    berryUser: 'Berry User',
    noMatchFound: 'No matching characters found',
    noCharactersYet: 'No characters yet',
    tryDifferentSearch: 'Try searching with a different name or trait.',
    createFirstCompanion: 'Tap the + button at the top to create your first companion!',
    startNewConversation: 'Start a new conversation...',
    justNow: 'Just now',
    deleteCharWarning: 'All messages will be permanently deleted.',
    errorInitMeetMode: 'Error initializing Meet Mode.',
    errorChat: 'Error communicating with AI companion.',
    noPriorChatHistory: 'No prior chat history yet. You agreed to meet up directly.',
    userWord: 'User',
    characterWord: 'Character',
    dateWord: 'Date',
    dismissError: 'Dismiss error',
    userProfileSettings: 'User Profile & Settings',
    yourDisplayName: 'Your Display Name',
    displayNameHint: 'Characters will address you by this name in both Chat Mode and Real Mode.',
    dualModeArchitecture: 'Berry Dual-Mode Memory Architecture',
    bulletChatMode: 'Casual texting messenger like LINE or WhatsApp.',
    bulletMeetMode: 'Cinematic in-person meeting. The meeting spot is naturally derived from what you discussed online in Chat Mode.',
    bulletSeamlessMemory: 'When returning to Chat Mode, characters remember the in-person meeting and text you about having just met!',
    seamlessMemory: 'Seamless Memory',
    saveChanges: 'Save Changes',
    characters: 'Characters',
    charactersSubtitle: 'Switch, create, or customize characters',
    newLabel: 'New',
    currentlySelected: 'Currently Selected',
    switchToCharacter: 'Switch to this character',
    confirmDelete: 'Confirm Delete',
    editCharacter: 'Edit character',
    deleteCharacter: 'Delete character',
  },
  my: {
    // Navigation
    navHome: 'ပင်မ',
    navChat: 'စကားပြော',
    navProfile: 'ပရိုဖိုင်',

    // Common
    save: 'သိမ်းမည်',
    cancel: 'မလုပ်တော့ပါ',
    delete: 'ဖျက်မည်',
    edit: 'ပြင်ဆင်မည်',
    close: 'ပိတ်မည်',
    search: 'ရှာဖွေရန်',
    settings: 'ဆက်တင်များ',
    language: 'ဘာသာစကား',
    model: 'AI မော်ဒယ်',
    selectModel: 'မော်ဒယ်ရွေးချယ်ရန်',
    active: 'လက်ရှိ',
    level: 'အဆင့်',
    msgs: 'စောင်',

    // Home Tab
    appName: 'Berry',
    appTagline: 'စကားပြောရန် အဖော်တစ်ဦးကို ရွေးချယ်ပါ',
    officialCompanions: 'တရားဝင် အဖော်များ',
    availableCount: 'ယောက် ရှိသည်',
    permanentNote: 'အမြဲတမ်း ပရိုဖိုင်များ (ဖျက်၍မရပါ)',
    searchPlaceholderHome: 'အမည်၊ စရိုက် သို့မဟုတ် ဝိသေသဖြင့် ရှာဖွေပါ...',
    talkChat: 'စာပို့မည်',
    talkMeet: 'တွေ့ဆုံမည်',
    viewProfile: 'ပရိုဖိုင်',
    noCompanionsFound: 'သင်ရှာဖွေသော အဖော်ကို ရှာမတွေ့ပါ။',

    // Chat Tab
    chatsTitle: 'စကားပြောခန်းများ',
    addCharacter: 'ဇာတ်ကောင်အသစ်',
    searchChats: 'စကားပြောခန်းများကို ရှာဖွေပါ...',
    noChatsTitle: 'စကားပြောခန်း မရှိသေးပါ',
    noChatsDesc: 'ပင်မစာမျက်နှာမှ အဖော်တစ်ဦးနှင့် စကားစတင်ပြောပါ သို့မဟုတ် ကိုယ်ပိုင်ဇာတ်ကောင်အသစ် ဖန်တီးပါ!',
    browseCompanions: 'အဖော်များကို ကြည့်မည်',
    recent: 'လတ်တလော',
    official: 'တရားဝင်',
    custom: 'စိတ်ကြိုက်',
    deleteChatConfirmTitle: 'ဇာတ်ကောင်နှင့် စကားပြောမှတ်တမ်း ဖျက်မည်လား?',
    deleteChatConfirmDesc: 'ဤဇာတ်ကောင်နှင့် စကားပြောမှတ်တမ်းအားလုံးကို ဖျက်ရန် သေချာပါသလား? ဤလုပ်ဆောင်ချက်ကို ပြန်လည်ပြင်ဆင်၍ မရပါ။',
    noMessagesYet: 'မက်ဆေ့ခ်ျ မရှိသေးပါ',

    // Header
    chatMode: 'စာပို့မုဒ်',
    meetMode: 'တွေ့ဆုံမုဒ်',
    chapters: 'အခန်းများ',
    bookmarks: 'မှတ်သားချက်များ',
    profileBtn: 'ပရိုဖိုင်နှင့် အခြေအနေ',
    backToHome: 'စကားပြောခန်းများသို့ ပြန်သွားမည်',

    // Chapter Sheet
    storyChapters: 'ဇာတ်လမ်း အခန်းများ',
    createNewChapter: 'အခန်းအသစ် ဖန်တီးမည်',
    deleteChapter: 'အခန်း ဖျက်မည်',
    deleteChapterConfirm: 'ဤအခန်းနှင့် ၎င်းအတွင်းရှိ မက်ဆေ့ခ်ျများကို ဖျက်ရန် သေချာပါသလား?',
    chapter: 'အခန်း',

    // Profile Tab
    myProfile: 'ကျွန်ုပ်၏ ပရိုဖိုင်',
    profileSubtitle: 'AI အဖော်များ သိရှိစေရန် သင့်ကိုယ်ရေးအချက်အလက်များကို ပြင်ဆင်ပါ',
    yourName: 'သင့်အမည်',
    namePlaceholder: 'ဥပမာ - Sky',
    aboutYou: 'သင့်အကြောင်း (AI အဖော်များနှင့် မျှဝေရန်)',
    aboutYouPlaceholder: 'AI အဖော်များ သင့်ကို ပိုမိုရင်းနှီးစွာ နားလည်နိုင်ရန် သင့်ဝါသနာ၊ စရိုက် သို့မဟုတ် နေထိုင်မှုပုံစံကို မျှဝေပါ...',
    saveProfile: 'ပရိုဖိုင် သိမ်းမည်',
    profileSaved: 'ပရိုဖိုင် သိမ်းဆည်းပြီး AI နှင့် ချိတ်ဆက်ပြီးပါပြီ!',
    changePhoto: 'ဓာတ်ပုံ ပြောင်းမည်',
    gender: 'လိင်',
    genderMale: 'အမျိုးသား',
    genderFemale: 'အမျိုးသမီး',
    genderOther: 'အခြား',
    totalCompanions: 'အဖော်များ',
    totalMessages: 'မက်ဆေ့ခ်ျများ',
    savedBookmarks: 'မှတ်သားချက်များ',
    settingsAndBackups: 'ဆက်တင်များနှင့် အရန်သိမ်းမှုများ',

    // Settings Modal
    appSettings: 'အက်ပ် ဆက်တင်များ',
    aiModelSelection: 'AI မော်ဒယ် ရွေးချယ်မှု',
    aiModelSubtitle: 'စကားပြောဆိုရန် အသုံးပြုလိုသော Gemini မော်ဒယ်ကို ရွေးချယ်ပါ:',
    geminiApiKeys: 'Google AI API သော့များ',
    apiKeysNotice: 'API သော့ကို ကြိုတင်ထည့်မထားပါ။ သင်၏ Google AI API သော့ကို ထည့်သွင်းပါ (AIza... သို့မဟုတ် AQ.xxx ဖော်မတ်)-',
    apiKeyBanner: 'အဖော်များနှင့် စကားပြောရန် သင်၏ အခမဲ့ Gemini API သော့ကို ထည့်သွင်းပါ။',
    apiKeyBannerAction: 'ဆက်တင်များ ဖွင့်မည်',
    apiKeyBannerDismiss: 'နောက်ထပ် မပြပါနှင့်',
    apiKeysPlaceholder: 'Google AI API သော့ကို ဤနေရာတွင် ထည့်ပါ (AIza သို့ AQ.)...',
    testKeys: 'သော့ စစ်ဆေးမည်',
    languageSection: 'ဘာသာစကား / Language',
    saveSettings: 'ဆက်တင်များ သိမ်းမည်',
    settingsSavedMessage: 'ဆက်တင်များကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!',
    backupData: 'ဒေတာစီမံခန့်ခွဲမှုနှင့် အရန်သိမ်းခြင်း',
    exportBackup: 'အရန်ဒေတာ ထုတ်ယူမည် (JSON)',
    importBackup: 'အရန်ဒေတာ ပြန်ထည့်မည် (JSON)',
    exportTxt: 'စကားပြောမှတ်တမ်း ထုတ်ယူမည် (.TXT)',
    exportMd: 'စကားပြောမှတ်တမ်း ထုတ်ယူမည် (.MD)',
    clearKeyPlaceholder: 'API သော့ ကြိုတင်ထည့်မထားပါ',

    // Chat / Real Mode
    typeMessage: 'မက်ဆေ့ခ်ျ ရိုက်ထည့်ပါ...',
    send: 'ပို့မည်',
    aiTyping: 'စာရိုက်နေသည်...',
    openingScene: 'တွေ့ဆုံရာနေရာသို့ ရောက်ရှိနေပါသည်...',

    // Bookmarks Drawer
    bookmarksTitle: 'သိမ်းဆည်းထားသော မှတ်သားချက်များ',
    closeBookmarks: 'မှတ်သားချက်များ ပိတ်မည်',
    noBookmarksSaved: 'မှတ်သားချက် မရှိသေးပါ',
    bookmarksEmptyDesc: 'စကားပြောခန်း သို့မဟုတ် တွေ့ဆုံမုဒ်တွင် မှတ်သားလိုသော စာတစ်စောင်ကို ၎င်း၏ ကြယ်ပွင့် အိုင်ကွန်ကို နှိပ်၍ ဤနေရာတွင် သိမ်းဆည်းနိုင်ပါသည်။',
    deleteBookmark: 'မှတ်သားချက် ဖျက်မည်',

    // Chat Mode View
    startChatWith: 'စကားစတင်ပြောရန်',
    startChatDesc: 'စကားစတင်ရန် စာ သို့မဟုတ် ဓာတ်ပုံ ပို့လိုက်ပါ။ မျက်နှာချင်းဆိုင် တွေ့ဆုံလိုပါက တွေ့ဆုံမုဒ်သို့ ပြောင်းနိုင်ပါသည်။',
    completed: 'ပြီးစီးပါပြီ',
    viewMeetDetails: 'တွေ့ဆုံမုဒ် အသေးစိတ် ကြည့်ရန် (ဖတ်ရန်သာ)',
    attachPhoto: 'ဓာတ်ပုံ ပူးတွဲရန်',
    removeImage: 'ဓာတ်ပုံ ဖယ်ရှားရန်',
    uploadPreview: 'တင်ထားသော ဓာတ်ပုံ',
    sendMessage: 'မက်ဆေ့ခ်ျ ပို့ရန်',
    bookmark: 'မှတ်သားရန်',
    removeBookmark: 'မှတ်သားချက် ဖယ်ရှားရန်',
    editMessage: 'မက်ဆေ့ခ်ျ ပြင်ဆင်ရန်',
    deleteMessage: 'မက်ဆေ့ခ်ျ ဖျက်ရန်',
    you: 'သင်',
    preview: 'အစမ်းကြည့်ရန်',

    // Real Mode View
    inPersonEncounterMode: 'မျက်နှာချင်းဆိုင် တွေ့ဆုံမုဒ်',
    endMeetMode: 'တွေ့ဆုံမှု အဆုံးသတ်ရန်',
    sceneSetting: 'တွေ့ဆုံသည့်နေရာ: ',
    settingUpEncounter: 'တွေ့ဆုံရန် ပြင်ဆင်နေပါသည်',
    generatingSceneDesc: 'သင်တို့၏ စကားပြောဆိုမှုများအပေါ် အခြေခံ၍ အခိုက်အတန့်နှင့် စကားများကို ဖန်တီးနေပါသည်',
    reactingToYou: 'သင့်အား တုံ့ပြန်နေပါသည်...',
    actionLabel: 'လုပ်ဆောင်ချက် (*action*)',
    speechLabel: 'စကားပြောခြင်း ("dialogue")',
    actionPlaceholder: 'သင့်လုပ်ဆောင်ချက်ကို ဖော်ပြပါ (ဥပမာ - ပြုံးပြသည်၊ လက်ကို ဆွဲကိုင်သည်)...',
    speechPlaceholder: 'မျက်နှာချင်းဆိုင် စကားပြောပါ...',
    normalPlaceholder: 'တုံ့ပြန်ပါ သို့မဟုတ် သင့်လုပ်ဆောင်ချက်ကို ဖော်ပြပါ...',
    sendToScene: 'ဇာတ်ကွက်သို့ ပို့ရန်',
    bookmarkScene: 'ဇာတ်ကွက် မှတ်သားရန်',
    sceneVisual: 'ဇာတ်ကွက် ပုံရိပ်',
    encounterSummaryTitle: 'တွေ့ဆုံမှု အနှစ်ချုပ်',
    meetAgainHint: 'နောက်တစ်ကြိမ် တွေ့ဆုံရန် Meet Mode ခလုတ်ကို နှိပ်ပါ',

    // Story Mode View
    startStoryMode: 'ဇာတ်လမ်းမုဒ် စတင်ရန်',
    newStory: 'ဇာတ်လမ်းအသစ်',
    continueStory: 'ဆက်ရန်',
    storyMode: 'ဇာတ်လမ်းမုဒ်',
    gameMaster: 'ဂိမ်းမာစတာ',
    chooseGenre: 'သင့်စွန့်စားခန်း အမျိုးအစားကို ရွေးပါ',
    exitStory: 'ဇာတ်လမ်းမှ ထွက်ရန်',
    gameMode: 'ဂိမ်းမုဒ်',
    gameModeDesc: 'သင့်အဖော်များနှင့် သီးခြား၊ အဆုံးမရှိ ရွေးချယ်စွန့်စားခန်းကို ကစားပါ',
    surpriseMe: '🎲 ကျပန်း ရွေးပေး',
    customGenrePlaceholder: 'သို့မဟုတ် ကိုယ်ပိုင်ဇာတ်လမ်းအမျိုးအစား/စိတ်ကူးကို ရိုက်ပါ...',
    customGenreStart: '▶ ဇာတ်လမ်းစတင်ရန်',
    yourAction: 'သင့်လုပ်ဆောင်ချက်...',
    typeCustomAction: 'သို့မဟုတ် ကိုယ်ပိုင်လုပ်ဆောင်ချက် ရိုက်ပါ',
    takeAction: 'ဤလုပ်ဆောင်ချက်ကို ရွေးပါ',
    storyOpening: 'ဇာတ်လမ်း ဖွင့်နေပါသည်...',
    gmTyping: 'ဂိမ်းမာစတာက နောက်အခန်းကို ရက်သွယ်နေသည်...',
    noStoriesYet: 'ဇာတ်လမ်း မရှိသေးပါ။ + ခလုတ်ဖြင့် စတင်ပါ!',
    yourTurn: 'သင်ဘာလုပ်မလဲ?',

    // Character Modal
    characterDetails: 'ဇာတ်ကောင် အသေးစိတ်',
    editCompanion: 'အဖော် ပြင်ဆင်ရန်',
    createNewCompanion: 'အဖော်အသစ် ဖန်တီးရန်',
    avatarSelection: 'ပရိုဖိုင်ပုံ ရွေးချယ်ရန်',
    uploadPhoto: 'ဓာတ်ပုံ တင်ရန်',
    uploadCustomAvatar: 'ပရိုဖိုင်ပုံ တင်ရန်',
    preset: 'အသင့်ပုံ',
    chatBackground: 'စကားပြောနောက်ခံ',
    setWallpaper: 'နောက်ခံပုံ သတ်မှတ်ရန်',
    changeWallpaper: 'နောက်ခံပုံ ပြောင်းရန်',
    remove: 'ဖယ်ရှားရန်',
    nameLabel: 'အမည်',
    nameCharPlaceholder: 'ဥပမာ - Reina',
    relationshipLabel: 'ဆက်ဆံရေး',
    relationshipPlaceholder: 'ဥပမာ - ရင်းနှီးသောမိတ်ဆွေ / ချစ်သူ',
    personalityLabel: 'စရိုက်လက္ခဏာ',
    personalityPlaceholder: 'ဥပမာ - ချိုသာ၊ အနုပညာဝါသနာရှင်၊ အလွယ်တကူ ရှက်တတ်၊ ရောင်စုံဆေးရေးပန်းချီ ကြိုက်နှစ်သက်',
    backstoryLabel: 'နောက်ခံဇာတ်လမ်း',
    backstoryPlaceholder: 'ဥပမာ - နွေးထွေးသော ကော်ဖီဆိုင်များကို နှစ်သက်သော အသက် ၂၀ အလှပညာ တက္ကသိုလ်ကျောင်းသူ',
    aiModelLabel: 'AI မော်ဒယ်',
    modelDefaultOption: 'Gemini 3.8 Flash (ပုံမှန် - မြန်ဆန်ပြီး အရည်အသွေးမြင့်)',
    modelLiteOption: 'Gemini 3.5 Flash Lite (အလွန်မြန်သော တုံ့ပြန်မှု)',
    memoriesLabel: 'အဖော်နှင့် ပတ်သက်သော မှတ်ဉာဏ်များ (မမေ့ပါ)',
    memoryPlaceholder: 'ဥပမာ - နွေးထွေးသော မာချာလတေး သောက်ရတာ ကြိုက်သည်',
    add: 'ထည့်ရန်',
    removeMemory: 'မှတ်ဉာဏ် ဖယ်ရှားရန်',
    systemPromptLabel: 'စနစ် ပရောမ့် (ကိုယ်ပိုင် ပြင်ဆင်လိုပါက)',
    systemPromptPlaceholder: 'ပုံမှန် စနစ်ညွှန်ကြားချက်များ အသုံးပြုလိုပါက အလွတ်ထားခဲ့ပါ...',
    deleteCharConfirm: 'ဖျက်ရန်',
    saveCompanion: 'အဖော် သိမ်းရန်',

    // Profile Modal
    characterProfile: 'ဇာတ်ကောင် ပရိုဖိုင်',
    closeProfile: 'ပရိုဖိုင် ပိတ်မည်',
    officialCompanion: 'တရားဝင် အဖော်',
    levelLabel: 'အဆင့်',
    relationWithYou: 'သင့်နှင့် ဆက်ဆံရေး:',
    closeCompanion: 'ရင်းနှီးသော အဖော်',
    characterTraits: 'ဇာတ်ကောင် ဝိသေသများ',
    affection: 'ချစ်ခင်မှု',
    affectionDesc: 'စကားပြောခြင်းနှင့် တွေ့ဆုံခြင်းဖြင့် တိုးလာသည်',
    chatStreak: 'စကားပြောဆက်တိုက်',
    days: 'ရက်',
    backstorySection: 'နောက်ခံဇာတ်လမ်း',
    backstoryFallback: 'သင့်နှင့် ချိတ်ဆက်ရန် အသင့်ရှိသော နူးညံ့သော အဖော်တစ်ဦး။',
    speakingStyleSection: 'စကားပြောပုံစံ',
    noMemoriesLogged: 'မှတ်ဉာဏ် မှတ်တမ်း မရှိသေးပါ။',
    chatOnline: 'အွန်လိုင်း စကားပြောရန်',
    meetUp: 'တွေ့ဆုံရန်',

    // PWA Install
    tapShare: 'အောက်ခြေရှိ',
    shareWord: 'Share',
    shareButtonBottom: 'ခလုတ်ကို နှိပ်ပါ။',
    addToHomeScreen: '"Add to Home Screen"',
    scrollDownSelect: 'အောက်သို့ ဆွဲချပြီး ရွေးချယ်ပါ',
    tapWord: 'နှိပ်ပါ',
    addWord: 'Add',
    addInTopRight: 'ကို ညာဘက်အပေါ်ထောင့်တွင် နှိပ်ပါ။ Berry AI သည် သင့်ဖုန်း၏ မူလအက်ပ်ကဲ့သို့ ဖွင့်နိုင်ပါမည်!',

    // Settings
    pwaReady: 'PWA အဆင်သင့်',

    // Header extras
    donate: 'လှူဒါန်းရန်',
    likeCharacter: 'ဇာတ်ကောင်ကို နှစ်သက်ရန်',
    switchLanguage: 'ဘာသာစကား ပြောင်းရန်',
    switchToMeetMode: 'တွေ့ဆုံမုဒ်သို့ ပြောင်းရန်',
    switchToChatMode: 'စာပို့မုဒ်သို့ ပြောင်းရန်',
    liked: 'နှစ်သက်ပြီး',
    donateWithKbzpay: 'KBZPay ဖြင့် လှူဒါန်းရန်',
    berryUser: 'Berry အသုံးပြုသူ',
    noMatchFound: 'ကိုက်ညီသော ဇာတ်ကောင် မတွေ့ပါ',
    noCharactersYet: 'ဇာတ်ကောင် မရှိသေးပါ',
    tryDifferentSearch: 'အခြားအမည် သို့မဟုတ် ဝိသေသဖြင့် ပြန်လည်ရှာဖွေကြည့်ပါ။',
    createFirstCompanion: 'သင့်ပထမဆုံး အဖော်ကို ဖန်တီးရန် အပေါ်ရှိ + ခလုတ်ကို နှိပ်ပါ!',
    startNewConversation: 'စကားပြောခန်းအသစ် စတင်ပါ...',
    justNow: 'ယခုလေးတင်',
    deleteCharWarning: 'မက်ဆေ့ခ်ျအားလုံး အပြီးအပိုင် ဖျက်ပစ်ပါမည်။',
    errorInitMeetMode: 'တွေ့ဆုံမုဒ် စတင်ရာတွင် အမှားဖြစ်ပွားခဲ့သည်။',
    errorChat: 'AI အဖော်နှင့် ဆက်သွယ်ရာတွင် အမှားဖြစ်ပွားခဲ့သည်။',
    noPriorChatHistory: 'ယခင်က စကားပြောမှတ်တမ်း မရှိသေးပါ။ တိုက်ရိုက် တွေ့ဆုံရန် သဘောတူခဲ့ကြသည်။',
    userWord: 'အသုံးပြုသူ',
    characterWord: 'ဇာတ်ကောင်',
    dateWord: 'ရက်စွဲ',
    dismissError: 'အမှား ပိတ်ရန်',
    userProfileSettings: 'အသုံးပြုသူ ပရိုဖိုင်နှင့် ဆက်တင်များ',
    yourDisplayName: 'သင့်အမည်',
    displayNameHint: 'ဇာတ်ကောင်များသည် စာပို့မုဒ်နှင့် တွေ့ဆုံမုဒ် နှစ်ခုလုံးတွင် ဤအမည်ဖြင့် သင့်ကို ခေါ်ပါမည်။',
    dualModeArchitecture: 'Berry နှစ်မုဒ် မှတ်ဉာဏ်စနစ်',
    bulletChatMode: 'LINE သို့မဟုတ် WhatsApp ကဲ့သို့ ရိုးရှင်းသော စာပို့စနစ်။',
    bulletMeetMode: 'မျက်နှာချင်းဆိုင် တွေ့ဆုံမှုဇာတ်ကွက်။ တွေ့ဆုံသည့်နေရာကို စာပို့မုဒ်တွင် ဆွေးနွေးခဲ့သည့် အကြောင်းအရာများမှ သဘာဝကျစွာ ဖန်တီးပေးပါသည်။',
    bulletSeamlessMemory: 'စာပို့မုဒ်သို့ ပြန်ရောက်သောအခါ ဇာတ်ကောင်များသည် မျက်နှာချင်းဆိုင် တွေ့ဆုံခဲ့မှုကို မှတ်မိပြီး တွေ့ဆုံပြီးကြောင်း ပြန်လည် စာပို့ပါမည်!',
    seamlessMemory: 'ချောမွေ့သော မှတ်ဉာဏ်',
    saveChanges: 'ပြောင်းလဲမှုများ သိမ်းရန်',
    characters: 'ဇာတ်ကောင်များ',
    charactersSubtitle: 'ဇာတ်ကောင်များ ပြောင်းလဲရန်၊ ဖန်တီးရန် သို့မဟုတ် ပြင်ဆင်ရန်',
    newLabel: 'အသစ်',
    currentlySelected: 'လက်ရှိ ရွေးထားသည်',
    switchToCharacter: 'ဤဇာတ်ကောင်သို့ ပြောင်းရန်',
    confirmDelete: 'ဖျက်ရန် အတည်ပြုပါ',
    editCharacter: 'ဇာတ်ကောင် ပြင်ဆင်ရန်',
    deleteCharacter: 'ဇာတ်ကောင် ဖျက်ရန်',
  },
};

export function getTranslation(lang?: string | AppLanguage) {
  if (lang === 'my') return TRANSLATIONS.my;
  return TRANSLATIONS.en;
}


import type { Character, CharacterLocaleFields } from '../types';

/**
 * Returns a companion's descriptive text in the active UI language.
 *
 * Default companions ship a `locales` map with an English and a Burmese copy of
 * every prose field. Custom companions only have their single authored copy, so
 * we fall back to the raw character fields when no locale entry exists.
 */
export function localizeCharacter(
  character: Character | null | undefined,
  lang: AppLanguage
): {
  name: string;
  personality: string;
  backstory: string;
  speakingStyle: string;
  relationship: string;
  traits: string[];
  customPrompt: string;
  initialChatGreeting: string;
  initialMeetGreeting: string;
  memories: string[];
} {
  const c: Partial<Character> = character || {};
  const locale: CharacterLocaleFields | undefined =
    lang === 'my' ? c.locales?.my : (c.locales?.en ?? (c.locales?.my ? undefined : undefined));

  const first = (picked: string[] | undefined): string =>
    (picked || []).map((v) => (v || '').trim()).filter(Boolean)[0] || '';

  const pickStr = (key: keyof CharacterLocaleFields, fallback: string): string => {
    const v = locale?.[key];
    return typeof v === 'string' && v.trim() ? v : fallback;
  };
  const pickArr = (key: 'traits' | 'memories', fallback: string[]): string[] => {
    const v = locale?.[key];
    return Array.isArray(v) && v.length > 0 ? v : fallback;
  };
  const pickAnyStr = (key: keyof CharacterLocaleFields, fallback: string): string =>
    first([pickStr(key, ''), fallback]);

  return {
    name: pickAnyStr('name', c.name || ''),
    personality: pickStr('personality', c.personality || ''),
    backstory: pickStr('backstory', c.backstory || ''),
    speakingStyle: pickStr('speakingStyle', c.speakingStyle || ''),
    relationship: pickStr('relationship', c.relationship || ''),
    traits: pickArr('traits', Array.isArray(c.traits) ? c.traits : []),
    customPrompt: pickStr('customPrompt', c.customPrompt || ''),
    initialChatGreeting: pickStr('initialChatGreeting', c.initialChatGreeting || ''),
    initialMeetGreeting: pickStr('initialMeetGreeting', c.initialMeetGreeting || ''),
    memories: pickArr('memories', Array.isArray(c.memories) ? c.memories : []),
  };
}
