export type MessagefiProgram = {
  version: "0.1.0";
  name: "messagefi_program";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "msgSummary";
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
    }
  ];
  accounts: [
    {
      name: "msgSummaryData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "msgId";
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
            name: "data";
            type: "string";
          },
          {
            name: "voteAmount";
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
          }
        ];
      };
    },
    {
      name: "voteSummary";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
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
      name: "AccInconsistent";
      msg: "account inconsistent";
    }
  ];
};

export const IDL: MessagefiProgram = {
  version: "0.1.0",
  name: "messagefi_program",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "msgSummary",
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
  ],
  accounts: [
    {
      name: "msgSummaryData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "msgId",
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
            name: "data",
            type: "string",
          },
          {
            name: "voteAmount",
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
        ],
      },
    },
    {
      name: "voteSummary",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
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
      name: "AccInconsistent",
      msg: "account inconsistent",
    },
  ],
};
