export const config = {
  debug: false,
  roochFishAddress: "0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488",
  gameStateObjectID: "0x5e89df84a672ea3697916f3a2a2ada4c63586db573b2e8af666da7d2b1084fd6",
  ponds: {
    0: "0x386c90b86887d54a613f72b8a86ec589fd9d9fa83848ca9a6447dd18314137e9",
    1: "0x400419573fc52935422333d6e0f7eef53f13e39eea16055db1924898a0457fd7",
    2: "0xdbc821d200abf863555912b15c34d9f5f838774035400a860eb8c928df3237b9",
    3: "0xdd2891692cfb116dbbdc0866b2570e2dcb949d0f9602ad95990e1b605616daa8",
    4: "0x70346a4c1603dfacfa41386460c8951c5ce9bea4e4fc832a23f0e4a25b586bdc",
    5: "0x85b8241eecce6181492e5a8c246d0e08672845676b1000840f9037f086527c79",
    6: "0x77fd214864c51192e4ce8000a023026f3ad3359fb2353224bd06ef8a03847cdb",
    7: "0x5f91dbcf76f6140e56b488b0028c5ff153fc72c6ad86e1ec5a7c8e246cc7a368"
  }
}

export type PondID = keyof typeof config.ponds;

/*
New modules:
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::simple_rng
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::fish
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::player
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::quad_tree
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::rooch_fish
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::utils
    0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::food

GameState:
{
    "metadata": {
    "id": "0x5e89df84a672ea3697916f3a2a2ada4c63586db573b2e8af666da7d2b1084fd6",
    "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
    "owner_bitcoin_address": null,
    "flag": 1,
    "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
    "size": "0",
    "created_at": "1730901364234",
    "updated_at": "1730901364234",
    "object_type": "0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::rooch_fish::GameState"
    },
    "value": {
    "new": "0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c4880180bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d601c07eb0
998b6bd80f2545dee606ecfb3e10bdc47935ed4689ac80d36d5e34029200000000000000000000000000000000000000000000000000000000000000000000000000000000"
    },
    "fields": []
},

ponds:
{
  "data": [
    {
      "field_key": "0x11228d102ec1ccd0e71d31a6115c33b886a4cd5cb48113db5c851c6d96e82b7f",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d611228d102ec1ccd0e71d31a6115c33b886a4cd5cb48113db5c851c6d96e82b7f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x0700000000000000019b575d26f6505bb76e95ad5a7e1a7483c1d2c10ebe8476e3098706c97bfe4c52",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "7",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x9b575d26f6505bb76e95ad5a7e1a7483c1d2c10ebe8476e3098706c97bfe4c52"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x14e41f37bef443dbf4163625571e6d035763b553cad649387b41be8f7c4c7569",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d614e41f37bef443dbf4163625571e6d035763b553cad649387b41be8f7c4c7569",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x02000000000000000193d31a90835d00e0e0306a5283621c6f73b39d771abb49f759950f6922bc222e",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "2",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x93d31a90835d00e0e0306a5283621c6f73b39d771abb49f759950f6922bc222e"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x28b56697e9fd6fbf8d6513b44cbeb793537ef7bd71dbe03c7a8d5cfc992ff407",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d628b56697e9fd6fbf8d6513b44cbeb793537ef7bd71dbe03c7a8d5cfc992ff407",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x000000000000000001386c90b86887d54a613f72b8a86ec589fd9d9fa83848ca9a6447dd18314137e9",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "0",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x386c90b86887d54a613f72b8a86ec589fd9d9fa83848ca9a6447dd18314137e9"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x2ce2e7bbb14b9b8d582aaf87c705f424e63373a1bb602deed89e14c95615e4b6",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d62ce2e7bbb14b9b8d582aaf87c705f424e63373a1bb602deed89e14c95615e4b6",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x040000000000000001de846f0e934796b52cc4339b5a71e9fb8298f9013181091d5fababf995deafba",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "4",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0xde846f0e934796b52cc4339b5a71e9fb8298f9013181091d5fababf995deafba"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x3bc998c5c75500958ca88ca47f5b654ff2fa97da0c1539b6b4c4c8722975a80f",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d63bc998c5c75500958ca88ca47f5b654ff2fa97da0c1539b6b4c4c8722975a80f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x06000000000000000126138e1b03c4911da6ec81a0b01ceb2a3cc29ee818852b8594e135cddfaf6c1f",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "6",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x26138e1b03c4911da6ec81a0b01ceb2a3cc29ee818852b8594e135cddfaf6c1f"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x5a473312d437bbf8c2690476f7f1df5040ff1f2398d19d7c039858dd3423bbbc",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d65a473312d437bbf8c2690476f7f1df5040ff1f2398d19d7c039858dd3423bbbc",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x050000000000000001eb6f1bd8bb56c5c10893a62ddedea744b8954b3238568b5eb9abf10f1497e96e",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "5",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0xeb6f1bd8bb56c5c10893a62ddedea744b8954b3238568b5eb9abf10f1497e96e"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0x7eb4036673c8611e43c3eff1202446612f22a4b3bac92b7e14c0562ade5f1a3f",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d67eb4036673c8611e43c3eff1202446612f22a4b3bac92b7e14c0562ade5f1a3f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x0100000000000000014c69daff350cf4b3ec433d21293d5c1cf7a916a01d5299df53fc18b4e09d25f2",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "1",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x4c69daff350cf4b3ec433d21293d5c1cf7a916a01d5299df53fc18b4e09d25f2"
              }
            }
          }
        },
        "display_fields": null
      }
    },
    {
      "field_key": "0xf30b43fa7dbdf31380c5b3efb2e960569b6caa30e6ee302358fbd43a605a5dbc",
      "state": {
        "id": "0x80bb87452291ece3419dac1cd716e8638127ac9bdf3906e03e4cbb7a412ff7d6f30b43fa7dbdf31380c5b3efb2e960569b6caa30e6ee302358fbd43a605a5dbc",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1730901364234",
        "updated_at": "1730901364234",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
        "value": "0x0300000000000000015f609a68ccbbbd31bedb05b3901d927c5ac63afea8b777249324445721e4f9d5",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>>",
          "value": {
            "name": "3",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xcda5dc99a8135dfba1e179771a3be156271437cad279a30735d5ff3577e5c488::pond::PondState>",
              "value": {
                "id": "0x5f609a68ccbbbd31bedb05b3901d927c5ac63afea8b777249324445721e4f9d5"
              }
            }
          }
        },
        "display_fields": null
      }
    }
  ],
  "next_cursor": "0xf30b43fa7dbdf31380c5b3efb2e960569b6caa30e6ee302358fbd43a605a5dbc",
  "has_next_page": false
}
*/