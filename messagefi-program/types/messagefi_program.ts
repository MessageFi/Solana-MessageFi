export type MessagefiProgram = {
  "version": "0.1.0",
  "name": "messagefi_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCompetitionRound",
      "accounts": [
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createMsg",
      "accounts": [
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "string"
        }
      ]
    },
    {
      "name": "voteMsgWithSol",
      "accounts": [
        {
          "name": "voteData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addComments",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    },
    {
      "name": "withdrawRewords",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "roundData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "competitionId",
            "type": "u64"
          },
          {
            "name": "buildCount",
            "type": "u64"
          },
          {
            "name": "rewards",
            "type": "u64"
          },
          {
            "name": "totalPopularity",
            "type": "u64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          },
          {
            "name": "roundEndTime",
            "type": "i64"
          },
          {
            "name": "topPopularityMsgId",
            "type": "u64"
          },
          {
            "name": "topPopularity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "msgSummaryData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "msgId",
            "type": "u64"
          },
          {
            "name": "mfcCoinId",
            "type": "publicKey"
          },
          {
            "name": "totalRewardsPool",
            "type": "u64"
          },
          {
            "name": "voteFeeRate",
            "type": "u64"
          },
          {
            "name": "rewardsFeeRate",
            "type": "u64"
          },
          {
            "name": "rateToCreator",
            "type": "u64"
          },
          {
            "name": "rewardsReduceRate",
            "type": "u64"
          },
          {
            "name": "rewardsReduceRound",
            "type": "u64"
          },
          {
            "name": "globalCompetitionId",
            "type": "u64"
          },
          {
            "name": "competitionPeriod",
            "type": "i64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "msgData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgId",
            "type": "u64"
          },
          {
            "name": "competitionId",
            "type": "u64"
          },
          {
            "name": "data",
            "type": "string"
          },
          {
            "name": "voteAmount",
            "type": "u64"
          },
          {
            "name": "popularity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voteData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voteSummary",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "commentData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "already initialized"
    },
    {
      "code": 6001,
      "name": "AccInconsistent",
      "msg": "account inconsistent"
    },
    {
      "code": 6002,
      "name": "NewCompetitionNotStarted",
      "msg": "new competition not stated"
    }
  ]
};

export const IDL: MessagefiProgram = {
  "version": "0.1.0",
  "name": "messagefi_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createCompetitionRound",
      "accounts": [
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createMsg",
      "accounts": [
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": "string"
        }
      ]
    },
    {
      "name": "voteMsgWithSol",
      "accounts": [
        {
          "name": "voteData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgSummary",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "roundData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "addComments",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    },
    {
      "name": "withdrawRewords",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    },
    {
      "name": "swap",
      "accounts": [
        {
          "name": "commentData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "msgData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "commentData",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "roundData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "competitionId",
            "type": "u64"
          },
          {
            "name": "buildCount",
            "type": "u64"
          },
          {
            "name": "rewards",
            "type": "u64"
          },
          {
            "name": "totalPopularity",
            "type": "u64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          },
          {
            "name": "roundEndTime",
            "type": "i64"
          },
          {
            "name": "topPopularityMsgId",
            "type": "u64"
          },
          {
            "name": "topPopularity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "msgSummaryData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "msgId",
            "type": "u64"
          },
          {
            "name": "mfcCoinId",
            "type": "publicKey"
          },
          {
            "name": "totalRewardsPool",
            "type": "u64"
          },
          {
            "name": "voteFeeRate",
            "type": "u64"
          },
          {
            "name": "rewardsFeeRate",
            "type": "u64"
          },
          {
            "name": "rateToCreator",
            "type": "u64"
          },
          {
            "name": "rewardsReduceRate",
            "type": "u64"
          },
          {
            "name": "rewardsReduceRound",
            "type": "u64"
          },
          {
            "name": "globalCompetitionId",
            "type": "u64"
          },
          {
            "name": "competitionPeriod",
            "type": "i64"
          },
          {
            "name": "roundStartTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "msgData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgId",
            "type": "u64"
          },
          {
            "name": "competitionId",
            "type": "u64"
          },
          {
            "name": "data",
            "type": "string"
          },
          {
            "name": "voteAmount",
            "type": "u64"
          },
          {
            "name": "popularity",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voteData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "voteSummary",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "commentData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyInitialized",
      "msg": "already initialized"
    },
    {
      "code": 6001,
      "name": "AccInconsistent",
      "msg": "account inconsistent"
    },
    {
      "code": 6002,
      "name": "NewCompetitionNotStarted",
      "msg": "new competition not stated"
    }
  ]
};
