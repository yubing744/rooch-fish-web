// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

import { roochMutationKeys } from '../constants'
import { UseMutationOptions, UseMutationResult, useMutation } from '@tanstack/react-query'
import { Signer, Transaction, ExecuteTransactionResponseView } from '@roochnetwork/rooch-sdk'
import { useCurrentSession } from '@roochnetwork/rooch-sdk-kit'
import { useRoochWSClient } from "./useRoochWSClient"
import { signAndExecuteTransactionX } from "../utils/index"
import { useSeqNumber } from './useSeqNumber'
import { useMemo } from 'react'

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
  
  const sender = useMemo(() => {
    if (session) {
      return session.getRoochAddress().toHexAddress()
    }
    return ''
  }, [session])
  
  const { seqNumber, incrementLocal } = useSeqNumber(sender)

  return useMutation({
    mutationKey: roochMutationKeys.signAndExecuteTransaction(mutationKey),
    mutationFn: async (args) => {
      if (!session) {
        throw Error('Create a session first')
      }

      const actualSigner = args.signer || session
      const result = await signAndExecuteTransactionX({
        client: client,
        transaction: args.transaction,
        seqNumber: seqNumber,
        signer: actualSigner,
      })

      console.log("result.execution_info.status:", result.execution_info.status);

      if (result.execution_info.status.type !== 'executed') {
        throw Error('transfer failed' + result.execution_info.status.type)
      }

      incrementLocal()
      return result
    },
    ...mutationOptions,
  })
}
