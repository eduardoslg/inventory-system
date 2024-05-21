import AppError from '@/errors/AppError'

import { BudgetItemRepository } from '../repositories/budget-item-repository'

export class DeleteBudgetItem {
  /**
   *
   */
  constructor(private readonly budgetItemRepository: BudgetItemRepository) {}

  public async execute(id: number): Promise<boolean> {
    const budgetItemExists = await this.budgetItemRepository.findById(id)

    if (!budgetItemExists) {
      throw new AppError(
        'Nenhuma item encontrado com o identificador informado.',
      )
    }

    await this.budgetItemRepository.delete(id)

    return true
  }
}
