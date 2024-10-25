import expressLoader from './express'
import Logger from './logger'
import loader from './index'
import { Express } from 'express'

jest.mock('./express')
jest.mock('./logger')

describe('Loader', () => {
  let app: Express

  beforeEach(() => {
    app = {} as Express
  })

  it('should call expressLoader with expressApp', async () => {
    await loader(app)
    expect(expressLoader).toHaveBeenCalledWith(app)
  })

  it('should log that Express is loaded', async () => {
    await loader(app)
    expect(Logger.info).toHaveBeenCalledWith('✌️ Express loaded')
  })
})
