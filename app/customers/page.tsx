"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Customer {
  id: string
  name: string
  email: string
  address: string
  affiliatedUser: string
}

const customers: Customer[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      address: "123 Main St, Anytown, AN 12345",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      address: "456 Elm St, Somewhere, SO 67890",
      affiliatedUser: "Céline"
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@example.com",
      address: "789 Oak Ave, Nowhere, NO 13579",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@example.com",
      address: "321 Pine Rd, Everywhere, EV 24680",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "5",
      name: "Eva Davis",
      email: "eva@example.com",
      address: "654 Maple Ln, Anywhere, AN 97531",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "6",
      name: "Frank Miller",
      email: "frank@example.com",
      address: "987 Cedar Blvd, Someplace, SP 13579",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "7",
      name: "Grace Lee",
      email: "grace@example.com",
      address: "246 Birch St, Othertown, OT 24680",
      affiliatedUser: "Céline"
    },
    {
      id: "8",
      name: "Henry Wilson",
      email: "henry@example.com",
      address: "135 Walnut Ave, Newcity, NC 97531",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "9",
      name: "Isabelle Taylor",
      email: "isabelle@example.com",
      address: "864 Spruce Rd, Oldtown, OL 86420",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "10",
      name: "Jack Anderson",
      email: "jack@example.com",
      address: "753 Fir Ln, Bigcity, BC 75319",
      affiliatedUser: "Céline"
    },
    {
      id: "11",
      name: "Karen Martinez",
      email: "karen@example.com",
      address: "951 Redwood Dr, Smallville, SV 15973",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "12",
      name: "Liam Thompson",
      email: "liam@example.com",
      address: "357 Sequoia Ct, Metropolis, MT 35791",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "13",
      name: "Mia Garcia",
      email: "mia@example.com",
      address: "159 Sycamore St, Gotham, GT 95135",
      affiliatedUser: "Céline"
    },
    {
      id: "14",
      name: "Noah Robinson",
      email: "noah@example.com",
      address: "753 Willow Way, Star City, SC 75319",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "15",
      name: "Olivia Clark",
      email: "olivia@example.com",
      address: "852 Poplar Pl, Central City, CC 85213",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "16",
      name: "Peter Wright",
      email: "peter@example.com",
      address: "963 Aspen Ave, Coast City, CO 96321",
      affiliatedUser: "Céline"
    },
    {
      id: "17",
      name: "Quinn Lopez",
      email: "quinn@example.com",
      address: "741 Beech Blvd, Keystone, KS 74185",
      affiliatedUser: "Gaëlle"
    },
    {
      id: "18",
      name: "Rachel King",
      email: "rachel@example.com",
      address: "369 Chestnut Cir, Hub City, HC 36925",
      affiliatedUser: "Charlotte Morin"
    },
    {
      id: "19",
      name: "Samuel Scott",
      email: "samuel@example.com",
      address: "258 Dogwood Dr, Jump City, JC 25836",
      affiliatedUser: "Céline"
    },
    {
      id: "20",
      name: "Tina Turner",
      email: "tina@example.com",
      address: "147 Elm Estates, River City, RC 14725",
      affiliatedUser: "Gaëlle"
    }
  ]

export default function CustomerTableWithPagination() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return customers.slice(startIndex, endIndex)
  }

  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>Clients</CardTitle>
                <CardDescription>Une liste des clients et de leurs utilisateurs affiliés.</CardDescription>
            </CardHeader>
            <CardContent>
                
      <Table>
        <TableCaption>Une liste des clients et de leurs utilisateurs affiliés.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Utilisateur Affilié</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getCurrentPageData().map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.affiliatedUser}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Ouvrir le menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer.id)}>
                      Copier l'ID du client
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Voir le client</DropdownMenuItem>
                    <DropdownMenuItem>Modifier le client</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            //   disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            //   disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
            </CardContent>
        </Card>
    </div>
  )
}