import { afterAll, describe, expect, it } from 'vitest'

import { delay } from './helper'
import networks from './networks'
import { BuildBlockMode } from '@acala-network/chopsticks'

describe('periodicly building blocks', async () => {
  const acala = await networks.acala({
    buildBlockMode: BuildBlockMode.Periodiclly, // mode
  })
  const { chain } = acala

  afterAll(async () => {
    await acala.teardown()
  })

  it("upcoming block in periodicly works", async () => {
    expect(await chain.upcomingBlocks()).toEqual(0)

    await chain.txPool.periodicllyBuildBlock(async () => {
      await delay(12010)
      expect(await chain.upcomingBlocks()).toEqual(1)
    })
  })
})
