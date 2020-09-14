const add =(a,b)=> a+b;

test("should add numbers",()=>{
    const result=add(4,6);
    expect(result).toBe(10)
})