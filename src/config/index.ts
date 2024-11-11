export const config = {
  debug: false,
  network: "localnet",
  roochFishAddress: "0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7",
  gameStateObjectID: "0xcae6671dc7d2ba53064e2a3054cd983ca36ea4dc465bd75b52ec84411c442825",
  ponds: {
    0: "0x3f3c9c1a5cb43ab937f7f5b74c5e4a9ce797b83912f863206f4683eb9943ae66",
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
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::simple_rng
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::fish
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::player
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::quad_tree
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::rooch_fish
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::utils
    0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::food

{
  "metadata": {
    "id": "0xcae6671dc7d2ba53064e2a3054cd983ca36ea4dc465bd75b52ec84411c442825",
    "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
    "owner_bitcoin_address": null,
    "flag": 1,
    "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
    "size": "0",
    "created_at": "1731027327378",
    "updated_at": "1731027327378",
    "object_type": "0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::rooch_fish::GameState"
  },
  "value": {
    "new": "0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7012b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b66001d76be344a66ccb515893640ff9313157ceb7074d4fc4238253a38ff39
0cc2d8000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "fields": []
},

ponds:
{
  "data": [
    {
      "field_key": "0x11228d102ec1ccd0e71d31a6115c33b886a4cd5cb48113db5c851c6d96e82b7f",
      "state": {
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b66011228d102ec1ccd0e71d31a6115c33b886a4cd5cb48113db5c851c6d96e82b7f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x0700000000000000014f5d3e2cfc886d73e20dc71be894a772501e2979ae979714e6e1e33396a25079",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "7",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x4f5d3e2cfc886d73e20dc71be894a772501e2979ae979714e6e1e33396a25079"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b66014e41f37bef443dbf4163625571e6d035763b553cad649387b41be8f7c4c7569",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x02000000000000000108715f25cf4de9436d59a67f51b23d0abecd499307363ecaeca8840f9bd96e48",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "2",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x08715f25cf4de9436d59a67f51b23d0abecd499307363ecaeca8840f9bd96e48"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b66028b56697e9fd6fbf8d6513b44cbeb793537ef7bd71dbe03c7a8d5cfc992ff407",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x0000000000000000013f3c9c1a5cb43ab937f7f5b74c5e4a9ce797b83912f863206f4683eb9943ae66",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "0",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x3f3c9c1a5cb43ab937f7f5b74c5e4a9ce797b83912f863206f4683eb9943ae66"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b6602ce2e7bbb14b9b8d582aaf87c705f424e63373a1bb602deed89e14c95615e4b6",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x040000000000000001c5d238bda3fea0d7ba2744e9305bb743174a0fd056224745350864f46d1e73b6",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "4",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0xc5d238bda3fea0d7ba2744e9305bb743174a0fd056224745350864f46d1e73b6"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b6603bc998c5c75500958ca88ca47f5b654ff2fa97da0c1539b6b4c4c8722975a80f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x0600000000000000012fac2e722c2a3d3558d3afd822bbe69fcfea2b94496d846c6bb5969b72f9e3cf",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "6",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x2fac2e722c2a3d3558d3afd822bbe69fcfea2b94496d846c6bb5969b72f9e3cf"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b6605a473312d437bbf8c2690476f7f1df5040ff1f2398d19d7c039858dd3423bbbc",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x05000000000000000166637e749761ede8efc734d4ddadcb6aeb77b1faecd91e4d056bd8eb4e07017e",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "5",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x66637e749761ede8efc734d4ddadcb6aeb77b1faecd91e4d056bd8eb4e07017e"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b6607eb4036673c8611e43c3eff1202446612f22a4b3bac92b7e14c0562ade5f1a3f",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x0100000000000000017f31d20ce7a9392541fdf0b92d46ec8a8519f7caec2565cfa791feda1518f7ad",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "1",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0x7f31d20ce7a9392541fdf0b92d46ec8a8519f7caec2565cfa791feda1518f7ad"
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
        "id": "0x2b2160ad5ff8a02853839038b64357dccca150ed19b1c75d7160729aee35b660f30b43fa7dbdf31380c5b3efb2e960569b6caa30e6ee302358fbd43a605a5dbc",
        "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
        "owner_bitcoin_address": null,
        "flag": 0,
        "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
        "size": "0",
        "created_at": "1731027327378",
        "updated_at": "1731027327378",
        "object_type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
        "value": "0x030000000000000001bd9df8449e36ceb6c8398a5fd91d6515f4d689c0f0ce7317c44128be765e2bad",
        "decoded_value": {
          "abilities": 12,
          "type": "0x2::object::DynamicField<u64, 0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>>",
          "value": {
            "name": "3",
            "value": {
              "abilities": 12,
              "type": "0x2::object::Object<0xe97dd62eec97c3fd6c8e13d850653e77ff55943717d10ff67f31c16c2ea68ce7::pond::PondState>",
              "value": {
                "id": "0xbd9df8449e36ceb6c8398a5fd91d6515f4d689c0f0ce7317c44128be765e2bad"
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