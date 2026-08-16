import{describe,expect,it}from"vitest";import{isConnected,sumCells,tryClear,makeGrid}from"./game.js";
describe("tensum",()=>{it("connected path",()=>{expect(isConnected([[0,0],[0,1],[1,1]])).toBe(true);expect(isConnected([[0,0],[1,1]])).toBe(false);});
it("clears sum 10",()=>{const g=[[1,9,2],[3,4,5],[6,7,8]];const r=tryClear(g,[[0,0],[0,1]]);expect(r.ok).toBe(true);expect(r.score).toBe(2);});
it("rejects bad sum",()=>{const g=makeGrid(3,3,()=>0.1);expect(tryClear(g,[[0,0],[0,1]]).ok).toBe(false);});});
