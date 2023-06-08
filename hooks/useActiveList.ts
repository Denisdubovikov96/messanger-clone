import {create} from 'zustand';

interface ActiveListStore {
    members: string[],
    add: (id:string) => void
    remove: (id:string) => void
    set: (ids:string[]) => void
}


const useActiveList = create<ActiveListStore>((set)=>({
    members: [],
    add: (id) => {
        return set((state) => ({members: [...state.members, id]}))
    },
    remove: (id) => {
        
        return set((state) => ({members: state.members.filter((member) => member !== id)}))
    },
    set: (ids) => {
        return set({members: ids})
    }
}))

export default useActiveList