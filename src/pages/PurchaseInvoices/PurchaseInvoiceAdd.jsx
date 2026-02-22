import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { HiDocumentText } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { FiSave, FiCalendar, FiCheckCircle, FiPackage, FiUser, FiX, FiAlertTriangle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { Visibility, Delete, CheckCircle, Error, Close } from "@mui/icons-material";
import "./PurchaseInvoiceAdd.scss";

const PurchaseInvoiceAdd = ({ setType }) => {
  const [selectedPO, setSelectedPO] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPODetailsOpen, setIsPODetailsOpen] = useState(false);
  const [selectedGRN, setSelectedGRN] = useState(null);
  const [isGRNDialogOpen, setIsGRNDialogOpen] = useState(false);
  const [selectedInvoiceItems, setSelectedInvoiceItems] = useState([]);
  const [availableGRNItems, setAvailableGRNItems] = useState([
    { code: "IC-005", name: "Microcontroller ATmega328", uom: "PCS", qty: 150, unitPrice: 250, gst: 18, total: 44250.00 },
    { code: "IC-006", name: "LCD Display 16x2", uom: "PCS", qty: 50, unitPrice: 180, gst: 18, total: 10620.00 },
    { code: "IC-007", name: "Resistor 10K Ohm", uom: "PCS", qty: 500, unitPrice: 2, gst: 18, total: 1180.00 },
    { code: "IC-008", name: "Capacitor 100uF", uom: "PCS", qty: 200, unitPrice: 5, gst: 18, total: 1180.00 },
  ]);
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [payments, setPayments] = useState([]);

  // Mock GRN data for matching validation
  const grnDataForMatching = {
    "IC-005": { qty: 150, unitPrice: 250 },
    "IC-006": { qty: 50, unitPrice: 180 },
    "IC-007": { qty: 500, unitPrice: 2 },
    "IC-008": { qty: 200, unitPrice: 5 },
    "IC-002": { qty: 1000, unitPrice: 5 },
    "IC-003": { qty: 800, unitPrice: 3 },
  };

  // Calculate matching status
  const getMatchingValidation = () => {
    if (selectedInvoiceItems.length === 0) {
      return { matched: [], unmatched: [], status: 'empty' };
    }

    const matched = [];
    const unmatched = [];

    selectedInvoiceItems.forEach(item => {
      const grnItem = grnDataForMatching[item.code];
      if (grnItem) {
        const qtyMatch = item.qty === grnItem.qty;
        const priceMatch = item.unitPrice === grnItem.unitPrice;
        
        if (qtyMatch && priceMatch) {
          matched.push({
            ...item,
            grnQty: grnItem.qty,
            grnPrice: grnItem.unitPrice,
            status: 'matched'
          });
        } else {
          unmatched.push({
            ...item,
            grnQty: grnItem.qty,
            grnPrice: grnItem.unitPrice,
            status: 'unmatched',
            details: priceMatch ? 'Qty mismatch' : `Price mismatch: Invoice ₹${item.unitPrice} vs GRN ₹${grnItem.unitPrice}`
          });
        }
      } else {
        unmatched.push({
          ...item,
          grnQty: '-',
          grnPrice: '-',
          status: 'unmatched',
          details: 'Item not found in GRN'
        });
      }
    });

    let status = 'empty';
    if (matched.length > 0 && unmatched.length === 0) {
      status = 'perfect';
    } else if (matched.length > 0 && unmatched.length > 0) {
      status = 'partial';
    } else if (unmatched.length > 0) {
      status = 'none';
    }

    return { matched, unmatched, status };
  };

  const matchingResult = getMatchingValidation();

  const purchaseOrders = [
    { 
      id: "PO2024-001", 
      label: "PO2024-001 - ABC Electronics Ltd - ₹17,400", 
      vendor: "ABC Electronics Ltd", 
      amount: "₹17,400",
      poNumber: "PO2024-001",
      poDate: "2024-01-25",
      status: "Partially Received",
      totalValue: "₹26,880",
      totalItems: "1 items"
    },
    { 
      id: "PO2024-002", 
      label: "PO2024-002 - XYZ Components Pvt Ltd - ₹26,880", 
      vendor: "XYZ Components Pvt Ltd", 
      amount: "₹26,880",
      poNumber: "PO2024-002",
      poDate: "2024-01-30",
      status: "Partially Received",
      totalValue: "₹26,880",
      totalItems: "1 items"
    },
    { 
      id: "PO2024-003", 
      label: "PO2024-003 - Tech Solutions Inc - ₹18,900", 
      vendor: "Tech Solutions Inc", 
      amount: "₹18,900",
      poNumber: "PO2024-003",
      poDate: "2024-02-01",
      status: "Fully Received",
      totalValue: "₹18,900",
      totalItems: "2 items"
    },
  ];

  const filteredPOs = purchaseOrders.filter(po =>
    po.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const grnList = [
    {
      id: "GRN2024003",
      number: "GRN2024003",
      date: "2024-02-03",
      items: "1 items",
      amount: "₹29,500",
      poNumber: "PO2024-002",
      receivedBy: "John Doe",
      receivedDate: "2/2/2024",
      status: "Variance",
      lineItems: [
        { code: "IC-004", name: "LED Bulb 12W", poQty: 200, receivedQty: 195, unitPrice: "₹120", gst: "12%", total: "₹26,208", isPartial: true }
      ],
      totalValue: "₹26,208"
    },
    {
      id: "GRN2024003-B",
      number: "GRN2024003-B",
      date: "2024-02-08",
      items: "2 items",
      amount: "₹25,260",
      poNumber: "PO2024-002",
      receivedBy: "Jane Smith",
      receivedDate: "2/8/2024",
      status: "Complete",
      lineItems: [
        { code: "IC-005", name: "LED Strip 5M", poQty: 50, receivedQty: 50, unitPrice: "₹450", gst: "18%", total: "₹26,550", isPartial: false },
        { code: "IC-006", name: "Power Adapter", poQty: 30, receivedQty: 30, unitPrice: "₹180", gst: "12%", total: "₹6,048", isPartial: false }
      ],
      totalValue: "₹32,598"
    }
  ];

  const handleSelectPO = (po) => {
    setSelectedPO(po);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleViewGRN = (grn) => {
    setSelectedGRN(grn);
    setIsGRNDialogOpen(true);
  };

  const handleCloseGRNDialog = () => {
    setIsGRNDialogOpen(false);
    setSelectedGRN(null);
  };

  const handleAddInvoiceItem = (item) => {
    // Add item to selected items
    setSelectedInvoiceItems([...selectedInvoiceItems, item]);
    // Remove item from available items
    setAvailableGRNItems(availableGRNItems.filter(i => i.code !== item.code));
  };

  const handleRemoveInvoiceItem = (itemCode) => {
    // Find the item to remove
    const itemToRemove = selectedInvoiceItems.find(i => i.code === itemCode);
    if (itemToRemove) {
      // Remove from selected items
      setSelectedInvoiceItems(selectedInvoiceItems.filter(i => i.code !== itemCode));
      // Add back to available items (restore original values)
      const originalItem = availableGRNItems.find(i => i.code === itemCode) || 
        grnDataForMatching[itemCode] ? {
          code: itemCode,
          name: itemToRemove.name,
          uom: itemToRemove.uom,
          qty: grnDataForMatching[itemCode].qty,
          unitPrice: grnDataForMatching[itemCode].unitPrice,
          gst: itemToRemove.gst,
          total: itemToRemove.total
        } : itemToRemove;
      setAvailableGRNItems([...availableGRNItems, originalItem].sort((a, b) => a.code.localeCompare(b.code)));
    }
  };

  const handleUpdateInvoiceItem = (itemCode, field, value) => {
    setSelectedInvoiceItems(selectedInvoiceItems.map(item => {
      if (item.code === itemCode) {
        const updatedItem = { ...item, [field]: parseFloat(value) || 0 };
        // Recalculate total if qty, unitPrice, or gst changes
        if (field === 'qty' || field === 'unitPrice' || field === 'gst') {
          const qty = field === 'qty' ? parseFloat(value) : item.qty;
          const unitPrice = field === 'unitPrice' ? parseFloat(value) : item.unitPrice;
          const gst = field === 'gst' ? parseFloat(value) : item.gst;
          updatedItem.total = qty * unitPrice * (1 + gst / 100);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleRemoveUnmatched = () => {
    const { unmatched } = matchingResult;
    // Remove unmatched items from selected items
    const unmatchedCodes = unmatched.map(item => item.code);
    const remainingItems = selectedInvoiceItems.filter(item => !unmatchedCodes.includes(item.code));
    setSelectedInvoiceItems(remainingItems);
    
    // Add unmatched items back to available items (restore original values)
    const itemsToRestore = unmatched.map(item => {
      const grnItem = grnDataForMatching[item.code];
      return grnItem ? {
        code: item.code,
        name: item.name,
        uom: item.uom,
        qty: grnItem.qty,
        unitPrice: grnItem.unitPrice,
        gst: item.gst,
        total: item.total
      } : item;
    });
    setAvailableGRNItems([...availableGRNItems, ...itemsToRestore].sort((a, b) => a.code.localeCompare(b.code)));
  };

  // Additional Charges handlers
  const handleAddCharge = () => {
    const newCharge = {
      id: Date.now(),
      description: "",
      amount: 0,
      gst: 18,
      gstAmount: 0,
      total: 0
    };
    setAdditionalCharges([...additionalCharges, newCharge]);
  };

  const handleRemoveCharge = (chargeId) => {
    setAdditionalCharges(additionalCharges.filter(charge => charge.id !== chargeId));
  };

  const handleUpdateCharge = (chargeId, field, value) => {
    setAdditionalCharges(additionalCharges.map(charge => {
      if (charge.id === chargeId) {
        const updatedCharge = { ...charge, [field]: field === 'description' ? value : parseFloat(value) || 0 };
        
        // Recalculate GST amount and total
        const amount = field === 'amount' ? parseFloat(value) || 0 : charge.amount;
        const gst = field === 'gst' ? parseFloat(value) || 0 : charge.gst;
        updatedCharge.gstAmount = amount * (gst / 100);
        updatedCharge.total = amount + updatedCharge.gstAmount;
        
        return updatedCharge;
      }
      return charge;
    }));
  };

  // Payment handlers
  const handleAddPayment = () => {
    const today = new Date().toISOString().split('T')[0];
    const newPayment = {
      id: Date.now(),
      date: today,
      amount: 0,
      method: "Bank Transfer",
      reference: "",
      notes: ""
    };
    setPayments([...payments, newPayment]);
  };

  const handleRemovePayment = (paymentId) => {
    setPayments(payments.filter(payment => payment.id !== paymentId));
  };

  const handleUpdatePayment = (paymentId, field, value) => {
    setPayments(payments.map(payment => {
      if (payment.id === paymentId) {
        return { 
          ...payment, 
          [field]: field === 'amount' ? parseFloat(value) || 0 : value 
        };
      }
      return payment;
    }));
  };

  // Calculate totals
  const invoiceItemsTotal = selectedInvoiceItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const additionalChargesTotal = additionalCharges.reduce((sum, charge) => sum + (charge.total || 0), 0);
  const invoiceTotal = invoiceItemsTotal + additionalChargesTotal;
  const totalPaid = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const outstandingBalance = invoiceTotal - totalPaid;

  // Check if all required fields are filled
  const isFormValid = () => {
    if (!selectedPO) return false;
    if (selectedInvoiceItems.length === 0) return false;
    
    const matchingResult = getMatchingValidation();
    if (matchingResult.status === 'none') return false;
    
    return true;
  };

  return (
    <Box className="purchaseInvoiceAdd">
       <Box
      className="erpCreateHeader"
      style={{ background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)"}}
    >
      <Box className="erpCreateHeaderLeft">
        <Box
          className="erpCreateHeaderIcon"
          style={{ background: "rgba(255,255,255,0.18)"}}
        >
          <HiDocumentText size={26} color="#fff" />
        </Box>

        <Box>
          <Typography
            component="div"
            className="erpCreateHeaderTitle"
          >
             Create Purchase Invoice
          </Typography>

          <Typography
            component="div"
            className="erpCreateHeaderSubtitle"
          >
           Select PO, match GRNs with vendor invoice details
          </Typography>
        </Box>
      </Box>

      <IconButton
        className="erpCreateHeaderClose"
      >
        <FiX size={22} />
      </IconButton>
    </Box>

   
        <Box className="revisionRequiredBanner">
          <Box className="revisionRequiredContent">
            <Box className="revisionRequiredHeader">
              <FiAlertTriangle className="revisionRequiredIcon" />
              <Typography className="revisionRequiredTitle">Revision Required</Typography>
            </Box>
            <Typography className="revisionRequiredMessage">
              This invoice has been sent back for revision. Please review the manager's comments below and make necessary corrections.
            </Typography>
            
            <Box className="managerComments">
              <Typography className="managerCommentsLabel">Manager's Comments:</Typography>
              <Box className="managerCommentItem">
                <Box className="managerCommentHeader">
                  <Typography className="managerName">Emily Davis</Typography>
                  <Typography className="managerCommentDate">2024-02-11</Typography>
                </Box>
                <Typography className="managerCommentText">
                  Vendor invoice number format is incorrect. Please verify the invoice number with vendor (TECH-2024-999 seems unusual). Also confirm payment terms - PO mentions Net 45 but invoice shows Net 30.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>


        <Box className="erpStepCard">
          <Typography className="erpStepTitle">
            Step 1: Select Purchase Order
          </Typography>

          <Typography className="erpLabel">Purchase Order Number *</Typography>
          <div className="customDropdown">
            <div 
              className="customDropdownTrigger" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedPO ? selectedPO.label : "Select Purchase Order..."}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {isDropdownOpen && (
              <div className="customDropdownMenu">
                <div className="customDropdownSearchWrapper">
                  <svg className="customDropdownSearchIcon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    className="customDropdownSearch"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="customDropdownList">
                  {filteredPOs.length > 0 ? (
                    filteredPOs.map((po) => (
                      <div
                        key={po.id}
                        className={`customDropdownItem ${selectedPO?.id === po.id ? 'selected' : ''}`}
                        onClick={() => handleSelectPO(po)}
                      >
                        {po.label}
                      </div>
                    ))
                  ) : (
                    <div className="customDropdownEmpty">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedPO && (
            <div className="poDetailsAccordion">
              <div 
                className="poDetailsHeader"
                onClick={() => setIsPODetailsOpen(!isPODetailsOpen)}
              >
                <div className="poDetailsLeft">
                  <HiDocumentText className="poDetailsIcon" />
                  <span className="poDetailsTitle">Purchase Order Details</span>
                </div>
                {isPODetailsOpen ? <HiChevronUp className="poDetailsChevron" /> : <HiChevronDown className="poDetailsChevron" />}
              </div>
              
              {isPODetailsOpen && (
                <div className="poDetailsContent">
                  <div className="poDetailsGrid">
                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <HiDocumentText />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">VENDOR</div>
                        <div className="poDetailValue">{selectedPO.vendor}</div>
                      </div>
                    </div>

                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <FiCalendar />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">PO DATE</div>
                        <div className="poDetailValue">{selectedPO.poDate}</div>
                      </div>
                    </div>

                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <FaRupeeSign />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">TOTAL VALUE</div>
                        <div className="poDetailValue">{selectedPO.totalValue}</div>
                      </div>
                    </div>

                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <HiDocumentText />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">PO NUMBER</div>
                        <div className="poDetailValue">{selectedPO.poNumber}</div>
                      </div>
                    </div>

                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <FiCheckCircle />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">STATUS</div>
                        <div className="poDetailValue">{selectedPO.status}</div>
                      </div>
                    </div>

                    <div className="poDetailItem">
                      <div className="poDetailIcon">
                        <FiPackage />
                      </div>
                      <div className="poDetailInfo">
                        <div className="poDetailLabel">TOTAL ITEMS</div>
                        <div className="poDetailValue">{selectedPO.totalItems}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Box>
  

    
        <Box className="erpStepCard">
          <Typography className="erpStepTitle">
            Step 2: Select GRNs
          </Typography>

          {grnList.map((grn) => (
            <Box key={grn.id} className="grnCard">
              <Checkbox defaultChecked className="grnCheckbox" />
              <FiPackage className="grnIcon" />
              <Box className="grnInfo">
                <Typography className="grnNumber">
                  {grn.number}
                </Typography>
                <Typography className="grnSub">
                  {grn.date} · {grn.items}
                </Typography>
              </Box>
              <Typography className="grnAmount">{grn.amount}</Typography>
              <IconButton 
                className="grnViewBtn"
                onClick={() => handleViewGRN(grn)}
              >
                <Visibility />
              </IconButton>
            </Box>
          ))}

          <Box className="grnSummary">
            2 GRN(s) selected · Total: ₹54,760
          </Box>
        </Box>


        <Box className="erpStepCard">
          <Typography className="erpStepTitle">
            Step 3: Enter Vendor Invoice Details
          </Typography>

          <Box className="vendorInvoiceForm">
            <Box className="formRow">
              <Box className="formField">
                <Typography className="erpLabel">Vendor Invoice Number *</Typography>
                <input 
                  type="text" 
                  className="erpInput" 
                  placeholder="INV-2024-001"
                  defaultValue="INV-2024-001"
                />
              </Box>

              <Box className="formField">
                <Typography className="erpLabel">Invoice Date *</Typography>
                <input 
                  type="date" 
                  className="erpInput erpDateInput" 
                  defaultValue="2026-02-08"
                />
              </Box>

              <Box className="formField">
                <Typography className="erpLabel">Payment Terms *</Typography>
                <select className="erpSelect">
                  <option>Net 30 (30 days)</option>
                  <option>Net 15 (15 days)</option>
                  <option>Net 60 (60 days)</option>
                  <option>Due on Receipt</option>
                </select>
                <Typography className="erpFieldHint">Due date will be calculated automatically</Typography>
              </Box>

              <Box className="formField">
                <Typography className="erpLabel">Due Date *</Typography>
                <input 
                  type="date" 
                  className="erpInput erpDateInput" 
                  defaultValue="2026-03-10"
                />
              </Box>
            </Box>

            <Box className="formRow">
              <Box className="formField formFieldFull">
                <Typography className="erpLabel">Approval Authority (Manager) *</Typography>
                <select className="erpSelect">
                  <option>Select Manager...</option>
                  <option>John Smith - Operations Manager</option>
                  <option>Sarah Johnson - Finance Manager</option>
                  <option>Michael Brown - Purchase Manager</option>
                </select>
                <Typography className="erpFieldHint">Selected manager will be able to approve this invoice</Typography>
              </Box>
            </Box>

            <Box className="vendorItemsSection">
              <Box className="vendorItemsHeader">
                <Typography className="erpLabel">Vendor Invoice Items *</Typography>
                <select 
                  className="grnItemsDropdown"
                  value=""
                  onChange={(e) => {
                    const item = availableGRNItems.find(i => i.code === e.target.value);
                    if (item) handleAddInvoiceItem(item);
                  }}
                  disabled={availableGRNItems.length === 0}
                >
                  <option value="">Select from GRN items...</option>
                  {availableGRNItems.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} - {item.name}
                    </option>
                  ))}
                </select>
              </Box>

              <Box className="vendorItemsTable">
                <Box className="vendorItemsTableHeader">
                  <Box className="vendorItemsTableCell">Item Code</Box>
                  <Box className="vendorItemsTableCell">Item Name</Box>
                  <Box className="vendorItemsTableCell">UOM</Box>
                  <Box className="vendorItemsTableCell">Qty</Box>
                  <Box className="vendorItemsTableCell">Unit Price</Box>
                  <Box className="vendorItemsTableCell">GST %</Box>
                  <Box className="vendorItemsTableCell">Total</Box>
                  <Box className="vendorItemsTableCell"></Box>
                </Box>

                {selectedInvoiceItems.length > 0 ? (
                  selectedInvoiceItems.map((item) => (
                    <Box key={item.code} className="vendorItemsTableRow">
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="text" 
                          className="vendorItemInput" 
                          value={item.code}
                          readOnly
                        />
                      </Box>
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="text" 
                          className="vendorItemInput" 
                          value={item.name}
                          readOnly
                        />
                      </Box>
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="text" 
                          className="vendorItemInput vendorItemInputSmall" 
                          value={item.uom}
                          readOnly
                        />
                      </Box>
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="number" 
                          className="vendorItemInput vendorItemInputSmall" 
                          value={item.qty}
                          onChange={(e) => handleUpdateInvoiceItem(item.code, 'qty', e.target.value)}
                        />
                      </Box>
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="number" 
                          className="vendorItemInput vendorItemInputSmall" 
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateInvoiceItem(item.code, 'unitPrice', e.target.value)}
                        />
                      </Box>
                      <Box className="vendorItemsTableCell">
                        <input 
                          type="number" 
                          className="vendorItemInput vendorItemInputSmall" 
                          value={item.gst}
                          onChange={(e) => handleUpdateInvoiceItem(item.code, 'gst', e.target.value)}
                        />
                      </Box>
                      <Box className="vendorItemsTableCell vendorItemTotal">
                        ₹{item.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Box>
                      <Box className="vendorItemsTableCell vendorItemActions">
                        <IconButton 
                          className="vendorItemDeleteBtn"
                          onClick={() => handleRemoveInvoiceItem(item.code)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box className="vendorItemsEmpty">
                    No items added. Click "Add Item" to begin.
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>


        <Box className="erpStepCard">
          <Typography className="erpStepTitle">
            Step 4: PO-GRN-Invoice Matching Validation
          </Typography>

          {selectedInvoiceItems.length > 0 ? (
            <>
              <Box className="matchingTable">
                <Box className="matchingTableHeader">
                  <Box className="matchingTableCell itemCell">Item</Box>
                  <Box className="matchingTableCell">UOM</Box>
                  <Box className="matchingTableCell">PO Qty</Box>
                  <Box className="matchingTableCell">GRN Qty</Box>
                  <Box className="matchingTableCell">Invoice Qty</Box>
                  <Box className="matchingTableCell">GRN Price</Box>
                  <Box className="matchingTableCell">Invoice Price</Box>
                  <Box className="matchingTableCell statusCell">Status</Box>
                  <Box className="matchingTableCell detailsCell">Details</Box>
                </Box>

                {[...matchingResult.matched, ...matchingResult.unmatched].map((item) => (
                  <Box 
                    key={item.code} 
                    className={`matchingTableRow ${item.status === 'matched' ? 'matched' : 'unmatched'}`}
                  >
                    <Box className="matchingTableCell itemCell">
                      <div className="itemCode">{item.code}</div>
                      <div className="itemName">{item.name}</div>
                    </Box>
                    <Box className="matchingTableCell">{item.uom}</Box>
                    <Box className="matchingTableCell">{item.qty}</Box>
                    <Box className="matchingTableCell">{item.grnQty}</Box>
                    <Box className="matchingTableCell">{item.qty}</Box>
                    <Box className="matchingTableCell">₹{item.grnPrice}</Box>
                    <Box className="matchingTableCell">₹{item.unitPrice}</Box>
                    <Box className="matchingTableCell statusCell">
                      {item.status === 'matched' ? (
                        <Box className="statusBadge matched">
                          <FiCheckCircle /> Matched
                        </Box>
                      ) : (
                        <Box className="statusBadge unmatched">
                          <FiAlertTriangle /> Unmatched
                        </Box>
                      )}
                    </Box>
                    <Box className="matchingTableCell detailsCell">
                      {item.status === 'matched' ? 'Matched' : item.details}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Status Alert */}
              {matchingResult.status === 'perfect' && (
                <Box className="matchingAlert success">
                  <FiCheckCircle className="alertIcon" />
                  <Box className="alertContent">
                    <Typography className="alertTitle">Perfect Match!</Typography>
                    <Typography className="alertMessage">
                      All {matchingResult.matched.length} vendor invoice item(s) exactly match the GRN data. Ready to create invoice.
                    </Typography>
                  </Box>
                </Box>
              )}

              {matchingResult.status === 'partial' && (
                <Box className="matchingAlert warning">
                  <FiAlertTriangle className="alertIcon" />
                  <Box className="alertContent">
                    <Typography className="alertTitle">
                      Partial Match: {matchingResult.matched.length} Matched, {matchingResult.unmatched.length} Unmatched
                    </Typography>
                    <Typography className="alertMessage">
                      You can create invoice for matched items only. Unmatched items will be excluded from the invoice.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    className="removeUnmatchedBtn"
                    startIcon={<Delete />}
                    onClick={handleRemoveUnmatched}
                  >
                    Remove Unmatched
                  </Button>
                </Box>
              )}

              {matchingResult.status === 'none' && (
                <Box className="matchingAlert error">
                  <FiAlertTriangle className="alertIcon" />
                  <Box className="alertContent">
                    <Typography className="alertTitle">All Items Unmatched</Typography>
                    <Typography className="alertMessage">
                      No items match the GRN data. Please correct the items or select items from the GRN dropdown.
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          ) : (
            <Box className="matchingEmpty">
              No items to validate. Please add items in Step 3.
            </Box>
          )}
        </Box>


        <Box className="erpStepCard">
          <Box className="additionalChargesHeader">
            <Typography className="erpStepTitle">
              Additional Charges (Optional)
            </Typography>
            <button
              className="addChargeBtn"
              onClick={handleAddCharge}
            >
              <span>+</span>
              Add Charge
            </button>
          </Box>

          {additionalCharges.length > 0 && (
            <Box className="additionalChargesTable">
              <Box className="additionalChargesTableHeader">
                <div>Description</div>
                <div>Amount</div>
                <div>GST %</div>
                <div>GST Amount</div>
                <div>Total</div>
                <div></div>
              </Box>

              {additionalCharges.map((charge) => (
                <Box key={charge.id} className="additionalChargesRow">
                  <input
                    type="text"
                    className="erpInput"
                    placeholder="e.g., Freight, Packaging"
                    value={charge.description}
                    onChange={(e) => handleUpdateCharge(charge.id, 'description', e.target.value)}
                  />
                  <input
                    type="number"
                    className="erpInput"
                    placeholder="0"
                    value={charge.amount}
                    onChange={(e) => handleUpdateCharge(charge.id, 'amount', e.target.value)}
                  />
                  <input
                    type="number"
                    className="erpInput"
                    placeholder="18"
                    value={charge.gst}
                    onChange={(e) => handleUpdateCharge(charge.id, 'gst', e.target.value)}
                  />
                  <div className="readonlyValue">₹{charge.gstAmount.toFixed(2)}</div>
                  <div className="readonlyValue">₹{charge.total.toFixed(2)}</div>
                  <IconButton
                    onClick={() => handleRemoveCharge(charge.id)}
                    className="deleteChargeBtn"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>


        <Box className="erpStepCard">
          <Box className="paymentRecordingHeader">
            <Box className="paymentRecordingTitleSection">
              <FaRupeeSign className="paymentRecordingIcon" />
              <Box>
                <Typography className="erpStepTitle">
                  Payment Recording (Optional)
                </Typography>
                <Typography className="paymentRecordingSubtitle">
                  Record full or partial payments made against this invoice
                </Typography>
              </Box>
            </Box>
            <button
              className="addPaymentBtn"
              onClick={handleAddPayment}
            >
              <span>+</span>
              Add Payment
            </button>
          </Box>

          {/* Summary Boxes */}
          <Box className="paymentSummaryBoxes">
            <Box className="paymentSummaryBox invoiceTotalBox">
              <Typography className="paymentSummaryLabel">Invoice Total</Typography>
              <Typography className="paymentSummaryValue">₹{invoiceTotal.toFixed(2)}</Typography>
            </Box>
            <Box className="paymentSummaryBox totalPaidBox">
              <Typography className="paymentSummaryLabel">Total Paid</Typography>
              <Typography className="paymentSummaryValue">₹{totalPaid.toFixed(2)}</Typography>
            </Box>
            <Box className="paymentSummaryBox outstandingBox">
              <Typography className="paymentSummaryLabel">Outstanding Balance</Typography>
              <Typography className="paymentSummaryValue">₹{outstandingBalance.toFixed(2)}</Typography>
            </Box>
          </Box>

          {/* Payment Records */}
          {payments.length === 0 ? (
            <Box className="paymentEmptyState">
              <FaRupeeSign className="paymentEmptyIcon" />
              <Typography className="paymentEmptyText">No payments recorded yet</Typography>
              <Typography className="paymentEmptySubtext">
                Click "Add Payment" to record full or partial payments
              </Typography>
            </Box>
          ) : (
            <Box className="paymentRecordsTable">
              <Box className="paymentRecordsTableHeader">
                <div>Payment Date</div>
                <div>Amount</div>
                <div>Payment Method</div>
                <div>Reference #</div>
                <div>Notes</div>
                <div></div>
              </Box>

              {payments.map((payment) => (
                <Box key={payment.id} className="paymentRecordRow">
                  <input
                    type="date"
                    className="erpInput"
                    value={payment.date}
                    onChange={(e) => handleUpdatePayment(payment.id, 'date', e.target.value)}
                  />
                  <input
                    type="number"
                    className="erpInput"
                    placeholder="0"
                    value={payment.amount}
                    onChange={(e) => handleUpdatePayment(payment.id, 'amount', e.target.value)}
                  />
                  <select
                    className="erpSelect"
                    value={payment.method}
                    onChange={(e) => handleUpdatePayment(payment.id, 'method', e.target.value)}
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                  </select>
                  <input
                    type="text"
                    className="erpInput"
                    placeholder="CHQ#/TXN#"
                    value={payment.reference}
                    onChange={(e) => handleUpdatePayment(payment.id, 'reference', e.target.value)}
                  />
                  <input
                    type="text"
                    className="erpInput"
                    placeholder="Optional notes..."
                    value={payment.notes}
                    onChange={(e) => handleUpdatePayment(payment.id, 'notes', e.target.value)}
                  />
                  <IconButton
                    onClick={() => handleRemovePayment(payment.id)}
                    className="deletePaymentBtn"
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>


      {/* ACTIONS FOOTER */}
      <Box className="erpActionsBar">
        <Box className="erpActionsBar-left">
          <button
            className="erpCancelBtn"
            onClick={() => setType && setType("list")}
          >
            Cancel
          </button>
        </Box>
        <Box className="erpActionsBar-right">
          <button
            className="erpDraftBtn"
            onClick={() => console.log("Save as draft")}
          >
            <FiSave size={18} />
            <span>Save as Draft</span>
          </button>
          <button
            className={`erpCreateBtn ${!isFormValid() ? 'disabled' : ''}`}
            onClick={() => isFormValid() && console.log("Create invoice")}
            disabled={!isFormValid()}
          >
            <FaTelegramPlane size={18} />
            <span>Create Purchase Invoice</span>
          </button>
        </Box>
      </Box>

      {/* GRN DETAILS DIALOG */}
      <Dialog
        open={isGRNDialogOpen}
        onClose={handleCloseGRNDialog}
        maxWidth="md"
        fullWidth
        className="grnDialog"
      >
        <DialogTitle className="grnDialogTitle">
          <Box className="grnDialogHeader">
            <Box className="grnDialogHeaderLeft">
              <FiPackage className="grnDialogIcon" />
              <Box>
                <Typography className="grnDialogMainTitle">GRN Details</Typography>
                <Typography className="grnDialogSubtitle">{selectedGRN?.number}</Typography>
              </Box>
            </Box>
            <IconButton onClick={handleCloseGRNDialog} className="grnDialogClose">
              <FiX />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent className="grnDialogContent">
          {selectedGRN && (
            <>
              {/* GRN Information */}
              <Typography className="grnDialogSectionTitle">GRN Information</Typography>
              <Box className="grnDialogInfoGrid">
                <Box className="grnDialogInfoItem">
                  <HiDocumentText className="grnDialogInfoIcon" />
                  <Box>
                    <Typography className="grnDialogInfoLabel">PO Number</Typography>
                    <Typography className="grnDialogInfoValue">{selectedGRN.poNumber}</Typography>
                  </Box>
                </Box>

                <Box className="grnDialogInfoItem">
                  <FiCalendar className="grnDialogInfoIcon" />
                  <Box>
                    <Typography className="grnDialogInfoLabel">Received Date</Typography>
                    <Typography className="grnDialogInfoValue">{selectedGRN.receivedDate}</Typography>
                  </Box>
                </Box>

                <Box className="grnDialogInfoItem">
                  <FiUser className="grnDialogInfoIcon" />
                  <Box>
                    <Typography className="grnDialogInfoLabel">Received By</Typography>
                    <Typography className="grnDialogInfoValue">{selectedGRN.receivedBy || "-"}</Typography>
                  </Box>
                </Box>

                <Box className="grnDialogInfoItem">
                  <FiPackage className="grnDialogInfoIcon" />
                  <Box>
                    <Typography className="grnDialogInfoLabel">Status</Typography>
                    <Box className={`grnDialogStatusBadge ${selectedGRN.status === 'Variance' ? 'variance' : 'complete'}`}>
                      {selectedGRN.status}
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Received Items */}
              <Typography className="grnDialogSectionTitle" sx={{ mt: 3 }}>Received Items</Typography>
              <Box className="grnDialogTable">
                <Box className="grnDialogTableHeader">
                  <Box className="grnDialogTableCell">Item Code</Box>
                  <Box className="grnDialogTableCell">Item Name</Box>
                  <Box className="grnDialogTableCell">PO Qty</Box>
                  <Box className="grnDialogTableCell">Received Qty</Box>
                  <Box className="grnDialogTableCell">Unit Price</Box>
                  <Box className="grnDialogTableCell">GST %</Box>
                  <Box className="grnDialogTableCell">Total</Box>
                </Box>
                {selectedGRN.lineItems.map((item, index) => (
                  <Box key={index} className="grnDialogTableRow">
                    <Box className="grnDialogTableCell">{item.code}</Box>
                    <Box className="grnDialogTableCell">{item.name}</Box>
                    <Box className="grnDialogTableCell">{item.poQty}</Box>
                    <Box className="grnDialogTableCell">
                      {item.receivedQty}
                      {item.isPartial && <span className="partialBadge">(Partial)</span>}
                    </Box>
                    <Box className="grnDialogTableCell">{item.unitPrice}</Box>
                    <Box className="grnDialogTableCell">{item.gst}</Box>
                    <Box className="grnDialogTableCell">{item.total}</Box>
                  </Box>
                ))}
                <Box className="grnDialogTableFooter">
                  <Box className="grnDialogTableCell"></Box>
                  <Box className="grnDialogTableCell"></Box>
                  <Box className="grnDialogTableCell"></Box>
                  <Box className="grnDialogTableCell"></Box>
                  <Box className="grnDialogTableCell"></Box>
                  <Box className="grnDialogTableCell totalLabel">Total Value:</Box>
                  <Box className="grnDialogTableCell totalValue">{selectedGRN.totalValue}</Box>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
        
        <DialogActions className="grnDialogActions">
          <Button variant="contained" onClick={handleCloseGRNDialog} className="grnDialogCloseBtn">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PurchaseInvoiceAdd;