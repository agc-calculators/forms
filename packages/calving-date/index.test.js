import { calculate } from './'

test('Should return calving date', () => {

    expect(calculate({}).values).toReturn(expect.objectContaining({
        calvingDate: expect.any(Date)
    }))

})