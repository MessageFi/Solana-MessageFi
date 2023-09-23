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
          "name": "solNum",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "msgSummaryData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgCounter",
            "type": "u64"
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
            "name": "data",
            "type": "string"
          }
        ]
      }
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
          "name": "solNum",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "msgSummaryData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgCounter",
            "type": "u64"
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
            "name": "data",
            "type": "string"
          }
        ]
      }
    }
  ]
};
