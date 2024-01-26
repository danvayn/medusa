import { createStep, StepResponse } from "@medusajs/workflows-sdk"
import { CreateCustomerDTO, ICustomerModuleService } from "@medusajs/types"
import { ModuleRegistrationName } from "@medusajs/modules-sdk"

export const createStoreCustomerStepId = "create-store-customer"
export const createStoreCustomerStep = createStep(
  createStoreCustomerStepId,
  async (data: CreateCustomerDTO[], { container }) => {
    const customerModule = container.resolve<ICustomerModuleService>(
      ModuleRegistrationName.CUSTOMER
    )

    const createdCustomers = await customerModule.create(data)

    return new StepResponse(
      createdCustomers,
      createdCustomers.map((createdCampaigns) => createdCampaigns.id)
    )
  },
  async (createdCustomerIds, { container }) => {
    if (!createdCustomerIds?.length) {
      return
    }

    const customerModule = container.resolve<ICustomerModuleService>(
      ModuleRegistrationName.CUSTOMER
    )

    await customerModule.delete(createdCustomerIds)
  }
)