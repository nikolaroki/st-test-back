import hi from './queries/hi';
import ho from './queries/ho';
import employees from './queries/employees';
import persons from './queries/persons';
import companies from './queries/companies';
import findPerson from './queries/getPerson';
import findCompany from './queries/getCompany';
import addPersonResolver from './mutations/addPerson';
import addCompanyResolver from './mutations/addCompany';
import editPersonResolver from './mutations/editPerson';
import editCompanyResolver from './mutations/editCompany';
import deletePersonResolver from './mutations/deletePerson'
import deleteCompanyResolver from './mutations/deleteCompany'


export default {

    

    Query: {
        hi,
        ho,
        employees,
        persons,
        companies,
        getPerson: (root, args) => {
            return findPerson(args.id);
            },
        getCompany: (root, args) => {
            return findCompany(args.id);
            },   
    },
    Mutation: {
        addPerson: (parent, args) => {
            return addPersonResolver(args);
        },
        addCompany: (parent, args) => {
            return addCompanyResolver(args);
        },
        editPerson: (parent, args) => {
            return editPersonResolver(args);
        },
        editCompany: (parent, args) => {
            return editCompanyResolver(args);
        },
        deletePerson:(parent,args) => {
            return deletePersonResolver(args.id);
        },
        deleteCompany:(parent,args) => {
            return deleteCompanyResolver(args.id);
        }

    }



}


