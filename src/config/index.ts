export const config = {
  debug: false,
  roochFishAddress: "0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565",
  gameStateObjectID: "0x819cb0a3da6193b8c676a99d2b6ecfc60e778af684f528e08dcd3e6fe89f454c",
  ponds: {
    0: "0xd0d2cd237a23ba512262a282cbb97b39d07106e953d4f26eb5ff938274f9a1f6",
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
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::simple_rng
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::pond
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::fish
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::player
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::quad_tree
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::rooch_fish
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::utils
    0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::food

GameState:
{
  "metadata": {
    "id": "0x819cb0a3da6193b8c676a99d2b6ecfc60e778af684f528e08dcd3e6fe89f454c",
    "owner": "rooch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqhxqaen",
    "owner_bitcoin_address": null,
    "flag": 1,
    "state_root": "0x5350415253455f4d45524b4c455f504c414345484f4c4445525f484153480000",
    "size": "0",
    "created_at": "1730342598000",
    "updated_at": "1730342598000",
    "object_type": "0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a4565::rooch_fish::GameState"
  },
  "value": {
    "new": "0xa705977b6baa5eb91498881f4acf116d1ae4ddcff2cc2d117f71aae01a4a456501aa8095fd1cbe5536f86763a5c10f8a8ca040eff9924fd73609bea1c79b567bd301d1e7c67f6cf1ea1473fa513c8f7d9096d3f0ff324904af72db07abc9
6831dc0100000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "fields": []
},

ponds:
[
    {
        "name": "7",
        "id": "0x413c2a468f6bbc82ba8c041e3cf47eb65ad2ce19b9519747e2880e1409a1e158"
    },
    {
        "name": "2",
        "id": "0x91a84666d949f133e1517699d06345ba878b3b08b0e50f9fc7961776050fab59"
    },
    {
        "name": "0",
        "id": "0xd0d2cd237a23ba512262a282cbb97b39d07106e953d4f26eb5ff938274f9a1f6"
    },
    {
        "name": "4",
        "id": "0x4f47a11e968a95166ad566d85e496f9f45e42e5f0b58e1481eadf547b1fb5565"
    },
    {
        "name": "6",
        "id": "0x8b2e55b20646e6d2d2a87d11ea8de2d2c060b8e021dc73d214b9ea3a87f8be09"
    },
    {
        "name": "5",
        "id": "0xe187f3bf4b18a6071708d76a7cb6d82a2e605382c6227857eb12bc776f0cb21a"
    },
    {
        "name": "1",
        "id": "0x888d078e8b5ded1c5659ba745f945a1804903f0ae16efb3eac2ff68d6b683c41"
    },
    {
        "name": "3",
        "id": "0xae12ce8d900fad95abee8496effdcf2bd666ce95e1aecd6663b225fc4ffed2dd"
    }
]
*/