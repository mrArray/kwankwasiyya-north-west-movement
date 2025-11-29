import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, Supporter } from "@/lib/api";
import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminSupporters() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [lg, setLg] = useState("");
  const limit = 10;

  const fetchSupporters = async () => {
    setIsLoading(true);
    try {
      const response = await api.getAllSupporters({
        page,
        limit,
        search,
        state,
        LG: lg,
      });

      if (response.success && response.data) {
        const supportersArr = Array.isArray(response.data.supporters)
          ? response.data.supporters
          : [];
        setSupporters(supportersArr);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotal(response.data.pagination?.total || supportersArr.length);
      }
    } catch (error) {
      toast.error("Failed to load supporters");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupporters();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchSupporters();
  };

  const handleExportCsv = async () => {
    try {
      const blob = await api.exportCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `supporters_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported successfully");
    } catch (error) {
      toast.error("Failed to export CSV");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Supporters</h2>
            <p className="text-muted-foreground">Manage and view all registered supporters</p>
          </div>
          <Button onClick={handleExportCsv}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Name, phone, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="Filter by state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lg">Local Government</Label>
                <Input
                  id="lg"
                  placeholder="Filter by LG"
                  value={lg}
                  onChange={(e) => setLg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              All Supporters ({total.toLocaleString()})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-16 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : !Array.isArray(supporters) || supporters.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No supporters found
              </div>
            ) : (
              <>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[700px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reg. Number</TableHead>
                          <TableHead>Full Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>State</TableHead>
                          <TableHead>LG</TableHead>
                          <TableHead>Ward</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supporters.map((supporter) => (
                          <TableRow key={supporter.id}>
                            <TableCell className="font-mono text-sm">
                              {supporter.registrationNumber}
                            </TableCell>
                            <TableCell className="font-medium">{supporter.fullName}</TableCell>
                            <TableCell>{supporter.phoneNumber}</TableCell>
                            <TableCell>{supporter.state}</TableCell>
                            <TableCell>{supporter.LG}</TableCell>
                            <TableCell>{supporter.ward}</TableCell>
                            <TableCell>
                              {new Date(supporter.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <a
                                  href={api.getExportUrl(supporter.registrationNumber, 'image')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                 Download ID Card
                                </a>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
