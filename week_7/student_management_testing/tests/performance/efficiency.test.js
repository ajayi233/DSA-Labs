const mockingoose = require('mockingoose');
const Student = require('../../model/student'); // Replace with your Student model

describe('Performance Test: Database Query Efficiency', () => {
  it('should retrieve students efficiently', async () => {
    const mockData = Array.from({ length: 10 }, (_, i) => ({
      firstName: `Student${i}`,
      lastName: 'Test',
      email: `student${i}@test.com`,
    }));

    mockingoose(Student).toReturn(mockData, 'find');

    const start = Date.now();
    const students = await Student.find();
    const duration = Date.now() - start;

    expect(students).toHaveLength(10);
    expect(duration).toBeLessThan(100); // Query should take less than 100ms
  });
});
