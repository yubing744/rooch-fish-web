// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import { roochMutationKeys } from '../constants'
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import { Signer, Transaction, ExecuteTransactionResponseView } from '@roochnetwork/rooch-sdk'
import { useCurrentSession, useRoochClient } from '@roochnetwork/rooch-sdk-kit'
import { useRoochWSClient } from "./useRoochWSClient";

type UseSignAndExecuteTransactionArgs = {
  transaction: Transaction
  signer?: Signer
}

type UsesignAndExecuteTransactionResult = ExecuteTransactionResponseView

type UsesignAndExecuteTransactionOptions = Omit<
  UseMutationOptions<
    UsesignAndExecuteTransactionResult,
    Error,
    UseSignAndExecuteTransactionArgs,
    unknown
  >,
  'mutationFn'
>

export function useSignAndExecuteTransaction({
  mutationKey,
  ...mutationOptions
}: UsesignAndExecuteTransactionOptions = {}): UseMutationResult<
  UsesignAndExecuteTransactionResult,
  Error,
  UseSignAndExecuteTransactionArgs,
  unknown
> {
  const client = useRoochWSClient()
  const session = useCurrentSession()

  return useMutation({
    mutationKey: roochMutationKeys.signAndExecuteTransaction(mutationKey),
    mutationFn: async (args) => {
      if (!session) {
        throw Error('Create a session first')
      }

      const result = await client.signAndExecuteTransaction({
        transaction: args.transaction,
        signer: args.signer || session,
      })

      if (result.execution_info.status.type !== 'executed' && result.execution_info.status) {
        Error('transfer failed' + result.execution_info.status.type)
      }

      return result
    },
    ...mutationOptions,
  })
}
