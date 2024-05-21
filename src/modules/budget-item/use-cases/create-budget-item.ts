import AppError from '@/errors/AppError'
import { ItemRepository } from '@/modules/item/repositories/item-repository'

import { BudgetItemRepository } from '../repositories/budget-item-repository'
import { CreateBudgetItemInput } from '../validations/budget-item-validation'

export class CreateBudgetItem {
  /**
   *
   */
  constructor(
    private readonly budgetItemRepository: BudgetItemRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  public async execute({ budgetId, itemId, value }: CreateBudgetItemInput) {
    if (!budgetId) {
      throw new AppError('É necessário informar o orçamento.')
    }

    if (!itemId) {
      throw new AppError('É necessário informar o item.')
    }

    const itemExists = await this.itemRepository.findById(itemId)

    if (!itemExists) {
      throw new AppError('Nenhum item encontrado com o id informado.')
    }

    await this.budgetItemRepository.create({
      budgetId,
      itemId,
      value: value ?? 0,
    })

    return true
  }
}
