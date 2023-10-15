export type MessagefiProgram = {
  version: "0.1.0";
  name: "messagefi_program";
  instructions: [
    {
      name: "initialize";
      docs: ["init program"];
      accounts: [
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "feeCollector";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mfcSwapPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createCompetitionRound";
      docs: ["create a new competition after competition_period expired"];
      accounts: [
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roundData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createMsg";
      docs: ["create a message"];
      accounts: [
        {
          name: "msgData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roundData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "data";
          type: "string";
        }
      ];
    },
    {
      name: "voteMsgWithSol";
      docs: ["vote sol for a message"];
      accounts: [
        {
          name: "voteData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roundData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "addComments";
      docs: ["add comments for a message"];
      accounts: [
        {
          name: "commentData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "commentData";
          type: "string";
        }
      ];
    },
    {
      name: "withdrawRewords";
      docs: ["withdraw rewards after a competition finish in the time range"];
      accounts: [
        {
          name: "msgData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "roundData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "voteData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "toAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "swap";
      docs: ["switch <MFC-SOL>, input MFC, out SOL"];
      accounts: [
        {
          name: "fromAta";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mfcPoolAcc";
          isMut: true;
          isSigner: false;
        },
        {
          name: "msgSummary";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeCollector";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
        },
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "msgSummaryData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isInitialized";
            type: "bool";
          },
          {
            name: "msgId";
            type: "u64";
          },
          {
            name: "mfcCoinId";
            type: "publicKey";
          },
          {
            name: "totalRewardsPool";
            type: "u64";
          },
          {
            name: "voteFeeRate";
            type: "u64";
          },
          {
            name: "rewardsFeeRate";
            type: "u64";
          },
          {
            name: "rateToCreator";
            type: "u64";
          },
          {
            name: "rewardsReduceRate";
            type: "u64";
          },
          {
            name: "rewardsReduceRound";
            type: "u64";
          },
          {
            name: "globalCompetitionId";
            type: "u64";
          },
          {
            name: "competitionPeriod";
            type: "i64";
          },
          {
            name: "roundStartTime";
            type: "i64";
          },
          {
            name: "mfcCurrentSupply";
            type: "u64";
          },
          {
            name: "mfcSwapPoolOwner";
            type: "publicKey";
          },
          {
            name: "solPoolAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "roundData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "competitionId";
            type: "u64";
          },
          {
            name: "buildCount";
            type: "u64";
          },
          {
            name: "rewards";
            type: "u64";
          },
          {
            name: "totalPopularity";
            type: "u64";
          },
          {
            name: "roundStartTime";
            type: "i64";
          },
          {
            name: "roundEndTime";
            type: "i64";
          },
          {
            name: "topPopularityMsgId";
            type: "u64";
          },
          {
            name: "topPopularity";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "msgData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "msgId";
            type: "u64";
          },
          {
            name: "competitionId";
            type: "u64";
          },
          {
            name: "data";
            type: "string";
          },
          {
            name: "voteAmount";
            type: "u64";
          },
          {
            name: "popularity";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "voteData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "popularity";
            type: "u64";
          },
          {
            name: "hasWithdraw";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "commentData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "data";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "AlreadyInitialized";
      msg: "already initialized";
    },
    {
      code: 6001;
      name: "AccInconsistent";
      msg: "account inconsistent";
    },
    {
      code: 6002;
      name: "NewCompetitionNotStarted";
      msg: "new competition not stated";
    },
    {
      code: 6003;
      name: "CompetitionHasntEnded";
      msg: "competition hasn't ended";
    },
    {
      code: 6004;
      name: "CompetitionIdNotMatched";
      msg: "competition id not matched";
    },
    {
      code: 6005;
      name: "MessageNotRankFirst";
      msg: "message not rank first";
    },
    {
      code: 6006;
      name: "RewardAlreadyWithdraw";
      msg: "reward already withdraw";
    },
    {
      code: 6007;
      name: "TokenAuthorityNotMatched";
      msg: "token authority not matched";
    },
    {
      code: 6008;
      name: "MintInconsistent";
      msg: "mint inconsistent";
    },
    {
      code: 6009;
      name: "OwnerInconsistent";
      msg: "owner inconsistent";
    }
  ];
};

export const IDL: MessagefiProgram = {
  version: "0.1.0",
  name: "messagefi_program",
  instructions: [
    {
      name: "initialize",
      docs: ["init program"],
      accounts: [
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "feeCollector",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mfcSwapPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createCompetitionRound",
      docs: ["create a new competition after competition_period expired"],
      accounts: [
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roundData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createMsg",
      docs: ["create a message"],
      accounts: [
        {
          name: "msgData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roundData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "data",
          type: "string",
        },
      ],
    },
    {
      name: "voteMsgWithSol",
      docs: ["vote sol for a message"],
      accounts: [
        {
          name: "voteData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roundData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "addComments",
      docs: ["add comments for a message"],
      accounts: [
        {
          name: "commentData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "commentData",
          type: "string",
        },
      ],
    },
    {
      name: "withdrawRewords",
      docs: ["withdraw rewards after a competition finish in the time range"],
      accounts: [
        {
          name: "msgData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "roundData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "voteData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "swap",
      docs: ["switch <MFC-SOL>, input MFC, out SOL"],
      accounts: [
        {
          name: "fromAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mfcPoolAcc",
          isMut: true,
          isSigner: false,
        },
        {
          name: "msgSummary",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeCollector",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "msgSummaryData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isInitialized",
            type: "bool",
          },
          {
            name: "msgId",
            type: "u64",
          },
          {
            name: "mfcCoinId",
            type: "publicKey",
          },
          {
            name: "totalRewardsPool",
            type: "u64",
          },
          {
            name: "voteFeeRate",
            type: "u64",
          },
          {
            name: "rewardsFeeRate",
            type: "u64",
          },
          {
            name: "rateToCreator",
            type: "u64",
          },
          {
            name: "rewardsReduceRate",
            type: "u64",
          },
          {
            name: "rewardsReduceRound",
            type: "u64",
          },
          {
            name: "globalCompetitionId",
            type: "u64",
          },
          {
            name: "competitionPeriod",
            type: "i64",
          },
          {
            name: "roundStartTime",
            type: "i64",
          },
          {
            name: "mfcCurrentSupply",
            type: "u64",
          },
          {
            name: "mfcSwapPoolOwner",
            type: "publicKey",
          },
          {
            name: "solPoolAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "roundData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "competitionId",
            type: "u64",
          },
          {
            name: "buildCount",
            type: "u64",
          },
          {
            name: "rewards",
            type: "u64",
          },
          {
            name: "totalPopularity",
            type: "u64",
          },
          {
            name: "roundStartTime",
            type: "i64",
          },
          {
            name: "roundEndTime",
            type: "i64",
          },
          {
            name: "topPopularityMsgId",
            type: "u64",
          },
          {
            name: "topPopularity",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "msgData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "msgId",
            type: "u64",
          },
          {
            name: "competitionId",
            type: "u64",
          },
          {
            name: "data",
            type: "string",
          },
          {
            name: "voteAmount",
            type: "u64",
          },
          {
            name: "popularity",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "voteData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "popularity",
            type: "u64",
          },
          {
            name: "hasWithdraw",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "commentData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "data",
            type: "string",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "AlreadyInitialized",
      msg: "already initialized",
    },
    {
      code: 6001,
      name: "AccInconsistent",
      msg: "account inconsistent",
    },
    {
      code: 6002,
      name: "NewCompetitionNotStarted",
      msg: "new competition not stated",
    },
    {
      code: 6003,
      name: "CompetitionHasntEnded",
      msg: "competition hasn't ended",
    },
    {
      code: 6004,
      name: "CompetitionIdNotMatched",
      msg: "competition id not matched",
    },
    {
      code: 6005,
      name: "MessageNotRankFirst",
      msg: "message not rank first",
    },
    {
      code: 6006,
      name: "RewardAlreadyWithdraw",
      msg: "reward already withdraw",
    },
    {
      code: 6007,
      name: "TokenAuthorityNotMatched",
      msg: "token authority not matched",
    },
    {
      code: 6008,
      name: "MintInconsistent",
      msg: "mint inconsistent",
    },
    {
      code: 6009,
      name: "OwnerInconsistent",
      msg: "owner inconsistent",
    },
  ],
};
