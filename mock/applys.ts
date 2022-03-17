import faker from 'faker'
import { Response, Request } from 'express'
import { IApply } from '../src/api/types'
const list: IApply[] = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push({
    apply_id: i,
    name: faker.name.findName(),
    code_type: faker.random.arrayElement([1, 2, 3]),
    code: faker.random.alphaNumeric(16),
    legal_persona_wechat: faker.name.findName(),
    legal_persona_name: faker.name.findName(),
    submit_time: faker.date.past(),
    end_time: faker.date.future(),
    status: faker.random.arrayElement([0, 1, 2, 3, 4])
  })
}

export const getApplys = (req: Request, res: Response) => {
  const { name, code, page = 1, limit = 20 } = req.query

  const mockList = list.filter((item) => {
    if (name && item.name !== name) return false
    if (code && item.code !== code) return false
    return true
  })

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * ((page as number) - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getApply = (req: Request, res: Response) => {
  const { id } = req.params
  const item = list.find((e) => e.apply_id.toString() === id)
  if (item) {
    return res.json({
      code: 20000,
      data: {
        item
      }
    })
  } else {
    return res.json({
      code: 40004,
      msg: 'apply not found'
    })
  }
}
